import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// --- Data Setup ---

const weeklyData = [
	{
		id: 'weekly-who5',
		title: 'WHO-5 Well-Being Index',
		questions: [
			{
				id: 'who5-1',
				text: 'I have felt cheerful and in good spirits.',
				options: {
					0: 'At no time',
					1: 'Some of the time',
					2: 'Less than half the time',
					3: 'More than half the time',
					4: 'Most of the time',
					5: 'All of the time',
				},
			},
			{
				id: 'who5-2',
				text: 'I have felt calm and relaxed.',
				options: {
					0: 'At no time',
					1: 'Some of the time',
					2: 'Less than half the time',
					3: 'More than half the time',
					4: 'Most of the time',
					5: 'All of the time',
				},
			},
			{
				id: 'who5-3',
				text: 'I have felt active and vigorous.',
				options: {
					0: 'At no time',
					1: 'Some of the time',
					2: 'Less than half the time',
					3: 'More than half the time',
					4: 'Most of the time',
					5: 'All of the time',
				},
			},
			{
				id: 'who5-4',
				text: 'I woke up feeling fresh and rested.',
				options: {
					0: 'At no time',
					1: 'Some of the time',
					2: 'Less than half the time',
					3: 'More than half the time',
					4: 'Most of the time',
					5: 'All of the time',
				},
			},
			{
				id: 'who5-5',
				text: 'My daily life has been filled with things that interest me.',
				options: {
					0: 'At no time',
					1: 'Some of the time',
					2: 'Less than half the time',
					3: 'More than half the time',
					4: 'Most of the time',
					5: 'All of the time',
				},
			},
		],
	},
]

const monthlyData = [
	{
		id: 'monthly-s1',
		title: 'Section 1',
		questions: [
			{
				id: 'pss-1',
				text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
				options: {
					A: 'Never',
					B: 'Almost Never',
					C: 'Sometimes',
					D: 'Fairly Often',
					E: 'Very Often',
				},
			},
			{
				id: 'pss-2',
				text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
				options: {
					A: 'Never',
					B: 'Almost Never',
					C: 'Sometimes',
					D: 'Fairly Often',
					E: 'Very Often',
				},
			},
			{
				id: 'pss-3',
				text: 'In the last month, how often have you felt nervous and "stressed"?',
				options: {
					A: 'Never',
					B: 'Almost Never',
					C: 'Sometimes',
					D: 'Fairly Often',
					E: 'Very Often',
				},
			},
		],
	},
	{
		id: 'monthly-s2',
		title: 'Section 2',
		questions: [
			{
				id: 'gad-1',
				text: 'Feeling nervous, anxious or on edge',
				options: {
					A: 'Not at all',
					B: 'Several days',
					C: 'More than half the days',
					D: 'Nearly every day',
				},
			},
			{
				id: 'gad-2',
				text: 'Not being able to stop or control worrying',
				options: {
					A: 'Not at all',
					B: 'Several days',
					C: 'More than half the days',
					D: 'Nearly every day',
				},
			},
			{
				id: 'gad-3',
				text: 'Worrying too much about different things',
				options: {
					A: 'Not at all',
					B: 'Several days',
					C: 'More than half the days',
					D: 'Nearly every day',
				},
			},
		],
	},
	{
		id: 'monthly-s3',
		title: 'Section 3',
		questions: [
			{
				id: 'phq-1',
				text: 'Little interest or pleasure in doing things?',
				options: {
					A: 'Not at all',
					B: 'Several days',
					C: 'More than half the days',
					D: 'Nearly every day',
				},
			},
			{
				id: 'phq-2',
				text: 'Feeling down, depressed, or hopeless?',
				options: {
					A: 'Not at all',
					B: 'Several days',
					C: 'More than half the days',
					D: 'Nearly every day',
				},
			},
			{
				id: 'phq-3',
				text: 'Trouble falling or staying asleep, or sleeping too much?',
				options: {
					A: 'Not at all',
					B: 'Several days',
					C: 'More than half the days',
					D: 'Nearly every day',
				},
			},
		],
	},
]

const buildSection = (index) => {
	const sectionId = `section-${index}-${Date.now()}`
	return {
		id: sectionId,
		title: `Section ${index}`,
		questions: [
			{
				id: `${sectionId}-q-1`,
				text: 'New Question',
				options: {
					A: 'Option A',
					B: 'Option B',
					C: 'Option C',
					D: 'Option D',
				},
			},
		],
	}
}

function GenerateQuiz() {
	const navigate = useNavigate()
	const [activeQuiz, setActiveQuiz] = useState('weekly')

	// Initialize with the requested datasets
	const [quizData, setQuizData] = useState({
		weekly: weeklyData,
		monthly: monthlyData,
	})

	const [selection, setSelection] = useState({
		weekly: {
			sectionId: weeklyData[0].id,
			questionId: weeklyData[0].questions[0].id,
		},
		monthly: {
			sectionId: monthlyData[0].id,
			questionId: monthlyData[0].questions[0].id,
		},
	})
	const [statusMessage, setStatusMessage] = useState('')

	const currentSections = quizData[activeQuiz]
	const currentSelection = selection[activeQuiz]

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

		return currentSections.find(
			(section) => section.id === currentSelection.sectionId
		)
	}

	const handleQuestionChange = (sectionId, questionId, value) => {
		updateSections((sections) =>
			sections.map((section) =>
				section.id === sectionId
					? {
							...section,
							questions: section.questions.map((question) =>
								question.id === questionId
									? { ...question, text: value }
									: question
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

	// --- Auto-Numbering Logic for Add/Delete Options ---

	const handleAddOption = (sectionId, questionId) => {
		updateSections((sections) =>
			sections.map((section) => {
				if (section.id !== sectionId) return section
				return {
					...section,
					questions: section.questions.map((question) => {
						if (question.id !== questionId) return question

						const keys = Object.keys(question.options)
						// Check if we are using Numeric (0,1,2) or Alpha (A,B,C) keys
						// If empty, default to 'A' (Alpha)
						const isNumeric = keys.length > 0 && !isNaN(keys[0])

						const nextIndex = keys.length
						const nextKey = isNumeric
							? nextIndex
							: String.fromCharCode(65 + nextIndex)

						return {
							...question,
							options: {
								...question.options,
								[nextKey]: `Option ${nextKey}`,
							},
						}
					}),
				}
			})
		)
	}

	const handleDeleteOption = (sectionId, questionId, optionKey) => {
		updateSections((sections) =>
			sections.map((section) => {
				if (section.id !== sectionId) return section
				return {
					...section,
					questions: section.questions.map((question) => {
						if (question.id !== questionId) return question

						// Detect mode based on the key we are deleting
						// If deleting '0', implies numeric mode. If deleting 'A', implies alpha.
						const isNumeric = !isNaN(optionKey)

						// 1. Filter out the deleted key
						const remainingValues = Object.entries(question.options)
							.filter(([k]) => k !== optionKey)
							.map(([, val]) => val)

						// 2. Re-index remaining keys sequentially
						const newOptions = {}
						remainingValues.forEach((val, index) => {
							const newKey = isNumeric
								? index
								: String.fromCharCode(65 + index)
							newOptions[newKey] = val
						})

						return {
							...question,
							options: newOptions,
						}
					}),
				}
			})
		)
	}

	// ---------------------------------------------

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

				const index = item.questions.findIndex(
					(question) => question.id === currentSelection.questionId
				)
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

			const section = currentSections.find(
				(item) => item.id === currentSelection.sectionId
			)
			const remaining = section
				? section.questions.filter(
						(question) => question.id !== currentSelection.questionId
				  )
				: []
			const fallbackQuestion = remaining[0] || null

			updateSelection({
				questionId: fallbackQuestion ? fallbackQuestion.id : null,
				sectionId: fallbackQuestion ? currentSelection.sectionId : null,
			})
			return
		}

		updateSections((sections) =>
			sections.filter((section) => section.id !== currentSelection.sectionId)
		)
		updateSelection({
			sectionId: null,
			questionId: null,
		})
	}

	const handleSave = () => {
		setStatusMessage(
			`${activeQuiz === 'weekly' ? 'Weekly' : 'Monthly'} quiz saved.`
		)
		window.setTimeout(() => setStatusMessage(''), 2000)
	}

	const handleGenerate = () => {
		setStatusMessage(
			`${
				activeQuiz === 'weekly' ? 'Weekly' : 'Monthly'
			} quiz generated successfully.`
		)
		window.setTimeout(() => setStatusMessage(''), 2000)
	}

	return (
		<div className="relative min-h-screen">
			{/* Background from Developer Dashboard */}
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />

			<div className="flex min-h-screen">
				{/* Sidebar from Developer Dashboard */}
				<aside className="flex h-screen w-56 flex-col gap-6 bg-[#204060] px-6 py-8 text-[#FFF4DE]">
					<nav className="flex flex-col gap-2 text-sm font-medium">
						{['Home', 'Generate quiz', 'Log out'].map((item) => (
							<button
								key={item}
								type="button"
								onClick={() => {
									if (item === 'Home') {
										navigate('/developer-dashboard')
										return
									}
									if (item === 'Generate quiz') {
										return
									}
									if (item === 'Log out') {
										navigate('/')
									}
								}}
								className={`rounded-xl px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF4DE] ${
									item === 'Generate quiz'
										? 'bg-[#0E1D2D] text-[#FFF4DE]'
										: 'hover:bg-[#0E1D2D]'
								}`}
							>
								{item}
							</button>
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex flex-1 flex-col px-6 py-6">
					<header className="mb-6 flex flex-wrap items-center justify-between gap-4">
						<h1 className="text-2xl font-semibold text-[#0E1D2D]">
							Generate Quiz
						</h1>
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
								{currentSections.map((section, sectionIdx) => (
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
												currentSelection.sectionId === section.id &&
												!currentSelection.questionId
													? 'bg-[#FEDC97] text-[#0E1D2D]'
													: 'bg-[#28666E] text-[#FFF4DE]'
											}`}
										>
											{section.title}
										</button>

										<div className="space-y-4">
											{section.questions.map((question, index) => {
												const isSelected =
													currentSelection.questionId === question.id
												const questionNumber = index + 1

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
															isSelected
																? 'border-[#FEDC97] bg-[#FFF4DE]'
																: 'border-transparent bg-[#BED4C5]'
														}`}
													>
														<div className="mb-3 flex items-center gap-3 text-sm font-semibold text-[#0E1D2D]">
															<span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FEDC97] text-xs">
																{questionNumber}
															</span>
															<input
																value={question.text}
																onChange={(event) =>
																	handleQuestionChange(
																		section.id,
																		question.id,
																		event.target.value
																	)
																}
																className="w-full bg-transparent text-sm font-semibold text-[#0E1D2D] outline-none"
															/>
														</div>

														<div className="grid gap-2 text-sm text-[#0E1D2D] md:grid-cols-2">
															{Object.entries(question.options).map(
																([key, value]) => (
																	<div
																		key={key}
																		className="flex items-center gap-2 rounded-xl bg-[#FFF4DE] px-3 py-2"
																	>
																		<span className="w-5 text-xs font-semibold">
																			{key}.
																		</span>
																		<input
																			value={value}
																			onChange={(event) =>
																				handleOptionChange(
																					section.id,
																					question.id,
																					key,
																					event.target.value
																				)
																			}
																			className="w-full bg-transparent text-sm outline-none"
																		/>
																		{/* Delete Option Button */}
																		<button
																			type="button"
																			onClick={(e) => {
																				e.stopPropagation()
																				handleDeleteOption(
																					section.id,
																					question.id,
																					key
																				)
																			}}
																			className="flex h-5 w-5 items-center justify-center rounded-full bg-[#204060] text-xs font-bold text-[#FFF4DE] hover:bg-red-500"
																		>
																			-
																		</button>
																	</div>
																)
															)}
														</div>

														{/* Add Option Button */}
														<div className="mt-3 flex justify-end">
															<button
																type="button"
																onClick={(e) => {
																	e.stopPropagation()
																	handleAddOption(section.id, question.id)
																}}
																className="flex h-6 w-6 items-center justify-center rounded-full bg-[#28666E] text-sm font-bold text-[#FFF4DE] hover:bg-[#204060]"
															>
																+
															</button>
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
							Add question
						</button>
						<button
							type="button"
							onClick={handleAddSection}
							className="rounded-full bg-[#FEDC97] px-5 py-2 text-sm font-semibold text-[#0E1D2D]"
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