import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const buildSection = (index) => {
	const sectionId = `section-${index}-${Date.now()}`
	return {
		id: sectionId,
		title: `Section ${index}`,
		questions: [
			{
				id: `${sectionId}-q-1`,
				text: 'Which of the following is the term for surgical complications resulting from surgical sponges left inside the patient\'s body?'
					.trim(),
				options: {
					A: 'Very low',
					B: 'Very low',
					C: 'Very low',
					D: 'Very low',
					E: 'Very low',
				},
			},
		],
	}
}

const buildInitialData = () => {
	const first = buildSection(1)
	const second = buildSection(2)
	second.questions.push({
		id: `${second.id}-q-2`,
		text: 'Which of the following is the term for surgical complications resulting from surgical sponges left inside the patient\'s body?'
			.trim(),
		options: {
			A: 'Very low',
			B: 'Very low',
			C: 'Very low',
			D: 'Very low',
			E: 'Very low',
		},
	})

	return [first, second]
}

function GenerateQuiz() {
	const navigate = useNavigate()
	const [activeQuiz, setActiveQuiz] = useState('weekly')
	const [quizData, setQuizData] = useState({
		weekly: buildInitialData(),
		monthly: buildInitialData(),
	})
	const [selection, setSelection] = useState({
		weekly: {
			sectionId: null,
			questionId: null,
		},
		monthly: {
			sectionId: null,
			questionId: null,
		},
	})
	const [statusMessage, setStatusMessage] = useState('')

	const currentSections = quizData[activeQuiz]
	const currentSelection = selection[activeQuiz]

	const indexedQuestions = useMemo(() => {
		const lookup = new Map()
		let running = 0
		currentSections.forEach((section) => {
			section.questions.forEach((question) => {
				running += 1
				lookup.set(question.id, running)
			})
		})
		return lookup
	}, [currentSections])

	const updateSections = (updater) => {
		setQuizData((prev) => ({
			...prev,
			[activeQuiz]: updater(prev[activeQuiz]),
		}))
	}

	const updateSelection = (next) => {
		setSelection((prev) => ({
			...prev,
			[activeQuiz]: {
				...prev[activeQuiz],
				...next,
			},
		}))
	}

	const ensureSelection = () => {
		if (currentSections.length === 0) {
			const newSection = buildSection(1)
			updateSections(() => [newSection])
			updateSelection({
				sectionId: newSection.id,
				questionId: newSection.questions[0].id,
			})
			return newSection
		}

		if (!currentSelection.sectionId) {
			const firstSection = currentSections[0]
			updateSelection({
				sectionId: firstSection.id,
				questionId: firstSection.questions[0]?.id || null,
			})
			return firstSection
		}

		return currentSections.find((section) => section.id === currentSelection.sectionId)
	}

	const handleQuestionChange = (sectionId, questionId, value) => {
		updateSections((sections) =>
			sections.map((section) =>
				section.id === sectionId
					? {
							...section,
							questions: section.questions.map((question) =>
								question.id === questionId ? { ...question, text: value } : question
							),
						}
					: section
			)
		)
	}

	const handleOptionChange = (sectionId, questionId, optionKey, value) => {
		updateSections((sections) =>
			sections.map((section) =>
				section.id === sectionId
					? {
							...section,
							questions: section.questions.map((question) =>
								question.id === questionId
									? {
											...question,
											options: {
												...question.options,
												[optionKey]: value,
											},
										}
									: question
							),
						}
					: section
			)
		)
	}

	const handleAddQuestion = () => {
		const section = ensureSelection()
		if (!section) return

		const newQuestion = {
			id: `${section.id}-q-${Date.now()}`,
			text: 'New question',
			options: {
				A: 'Option A',
				B: 'Option B',
				C: 'Option C',
				D: 'Option D',
				E: 'Option E',
			},
		}

		updateSections((sections) =>
			sections.map((item) => {
				if (item.id !== section.id) return item

				if (!currentSelection.questionId) {
					return {
						...item,
						questions: [...item.questions, newQuestion],
					}
				}

				const index = item.questions.findIndex((question) => question.id === currentSelection.questionId)
				const nextQuestions = [...item.questions]
				const insertIndex = index === -1 ? nextQuestions.length : index + 1
				nextQuestions.splice(insertIndex, 0, newQuestion)
				return {
					...item,
					questions: nextQuestions,
				}
			})
		)

		updateSelection({
			sectionId: section.id,
			questionId: newQuestion.id,
		})
	}

	const handleAddSection = () => {
		const nextIndex = currentSections.length + 1
		const newSection = buildSection(nextIndex)

		updateSections((sections) => [...sections, newSection])
		updateSelection({
			sectionId: newSection.id,
			questionId: newSection.questions[0].id,
		})
	}

	const handleDelete = () => {
		if (!currentSelection.sectionId) return

		if (currentSelection.questionId) {
			updateSections((sections) =>
				sections
					.map((section) => {
						if (section.id !== currentSelection.sectionId) return section
						const filtered = section.questions.filter(
							(question) => question.id !== currentSelection.questionId
						)
						return { ...section, questions: filtered }
					})
					.filter((section) => section.questions.length > 0)
			)

			const section = currentSections.find((item) => item.id === currentSelection.sectionId)
			const remaining = section
				? section.questions.filter((question) => question.id !== currentSelection.questionId)
				: []
			const fallbackQuestion = remaining[0] || null

			updateSelection({
				questionId: fallbackQuestion ? fallbackQuestion.id : null,
				sectionId: fallbackQuestion ? currentSelection.sectionId : null,
			})
			return
		}

		updateSections((sections) => sections.filter((section) => section.id !== currentSelection.sectionId))
		updateSelection({
			sectionId: null,
			questionId: null,
		})
	}

	const handleSave = () => {
		setStatusMessage(`${activeQuiz === 'weekly' ? 'Weekly' : 'Monthly'} quiz saved.`)
		window.setTimeout(() => setStatusMessage(''), 2000)
	}

	const handleGenerate = () => {
		setStatusMessage(
			`${activeQuiz === 'weekly' ? 'Weekly' : 'Monthly'} quiz generated successfully.`
		)
		window.setTimeout(() => setStatusMessage(''), 2000)
	}

	return (
		<div className="min-h-screen bg-[#204060] text-[#FFF4DE]">
			<div className="mx-auto flex min-h-screen max-w-[1300px]">
				<aside className="flex w-64 flex-col bg-[#0E1D2D] px-6 py-8">
					<div className="mb-10 rounded-2xl bg-[#204060] px-4 py-3 text-sm font-semibold text-[#FFF4DE]">
						MindEase
					</div>
					<nav className="flex flex-1 flex-col gap-3 text-sm">
						<button
							type="button"
							onClick={() => navigate('/developer-dashboard')}
							className="rounded-xl bg-[#204060] px-4 py-3 text-left text-[#FFF4DE] transition"
						>
							Home
						</button>
						<button
							type="button"
							className="rounded-xl bg-[#FEDC97] px-4 py-3 text-left font-semibold text-[#0E1D2D]"
						>
							Generate quiz
						</button>
						<button
							type="button"
							onClick={() => navigate('/')}
							className="mt-auto rounded-xl border border-[#28666E] px-4 py-3 text-left text-[#BED4C5]"
						>
							Log out
						</button>
					</nav>
				</aside>

				<main className="flex flex-1 flex-col px-8 py-6">
					<header className="mb-6 flex flex-wrap items-center justify-between gap-4">
						<h1 className="text-2xl font-semibold text-[#FFF4DE]">Generate Quiz</h1>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => setActiveQuiz('weekly')}
								className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
									activeQuiz === 'weekly'
										? 'bg-[#FEDC97] text-[#0E1D2D]'
										: 'bg-[#28666E] text-[#FFF4DE]'
								}`}
							>
								Weekly quiz
							</button>
							<button
								type="button"
								onClick={() => setActiveQuiz('monthly')}
								className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
									activeQuiz === 'monthly'
										? 'bg-[#FEDC97] text-[#0E1D2D]'
										: 'bg-[#28666E] text-[#FFF4DE]'
								}`}
							>
								Monthly quiz
							</button>
						</div>
					</header>

					<section className="flex-1 overflow-hidden rounded-3xl bg-[#6F9FA5]/30 p-6">
						<div className="h-[520px] overflow-y-auto pr-3">
							<div className="space-y-6">
								{currentSections.map((section) => (
									<div key={section.id} className="space-y-4">
										<button
											type="button"
											onClick={() =>
												updateSelection({
													sectionId: section.id,
													questionId: null,
												})
											}
											className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
												currentSelection.sectionId === section.id && !currentSelection.questionId
													? 'bg-[#FEDC97] text-[#0E1D2D]'
													: 'bg-[#28666E] text-[#FFF4DE]'
											}`}
										>
											{section.title}
										</button>

										<div className="space-y-4">
											{section.questions.map((question) => {
												const isSelected = currentSelection.questionId === question.id
												const questionNumber = indexedQuestions.get(question.id)

												return (
													<div
														key={question.id}
														role="button"
														tabIndex={0}
														onClick={() =>
															updateSelection({
																sectionId: section.id,
																questionId: question.id,
															})
														}
														onKeyDown={(event) => {
															if (event.key === 'Enter') {
																updateSelection({
																	sectionId: section.id,
																	questionId: question.id,
																})
															}
														}}
														className={`rounded-2xl border-2 p-4 transition ${
															isSelected ? 'border-[#FEDC97] bg-[#FFF4DE]' : 'border-transparent bg-[#BED4C5]'
														}`}
													>
														<div className="mb-3 flex items-center gap-3 text-sm font-semibold text-[#0E1D2D]">
															<span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FEDC97] text-xs">
																{questionNumber}
															</span>
															<input
																value={question.text}
																onChange={(event) =>
																	handleQuestionChange(section.id, question.id, event.target.value)
																}
																className="w-full bg-transparent text-sm font-semibold text-[#0E1D2D] outline-none"
															/>
														</div>

														<div className="grid gap-2 text-sm text-[#0E1D2D] md:grid-cols-2">
															{Object.entries(question.options).map(([key, value]) => (
																<label key={key} className="flex items-center gap-2 rounded-xl bg-[#FFF4DE] px-3 py-2">
																	<span className="w-5 text-xs font-semibold">{key}.</span>
																	<input
																		value={value}
																		onChange={(event) =>
																			handleOptionChange(section.id, question.id, key, event.target.value)
																		}
																		className="w-full bg-transparent text-sm outline-none"
																	/>
																</label>
															))}
														</div>
													</div>
												)
											})}
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					<div className="mt-5 flex flex-wrap items-center gap-3">
						<button
							type="button"
							onClick={handleAddQuestion}
							className="rounded-full bg-[#FEDC97] px-5 py-2 text-sm font-semibold text-[#0E1D2D]"
						>
							Add
						</button>
						<button
							type="button"
							onClick={handleAddSection}
							className="rounded-full bg-[#BED4C5] px-5 py-2 text-sm font-semibold text-[#0E1D2D]"
						>
							Add section
						</button>
						<button
							type="button"
							onClick={handleSave}
							className="rounded-full bg-[#7C9885] px-5 py-2 text-sm font-semibold text-[#0E1D2D]"
						>
							Save
						</button>
						<button
							type="button"
							onClick={handleDelete}
							className="rounded-full bg-[#28666E] px-5 py-2 text-sm font-semibold text-[#FFF4DE]"
						>
							Delete
						</button>
						<button
							type="button"
							onClick={handleGenerate}
							className="rounded-full bg-[#0E1D2D] px-5 py-2 text-sm font-semibold text-[#FEDC97]"
						>
							Generate
						</button>
						{statusMessage ? (
							<span className="text-sm text-[#FEDC97]">{statusMessage}</span>
						) : null}
					</div>
				</main>
			</div>
		</div>
	)
}

export default GenerateQuiz
