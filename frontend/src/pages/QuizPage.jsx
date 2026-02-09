import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const quizData = [
	{
		id: 'section-1',
		title: 'Section 1',
		questions: [
			{
				id: 'q-1',
				text: 'Which of the following is the term for surgical complications resulting from surgical sponges left inside the patient\'s body?',
				options: [
					'Gauze grievance disorder',
					'Retained surgical sponge syndrome',
					'Sponge-induced septicemia',
					'Fabric foreign object syndrome',
				],
			},
			{
				id: 'q-2',
				text: 'Which response best describes healthy coping during stressful weeks?',
				options: [
					'Avoiding all contact',
					'Bottling emotions',
					'Balancing rest and support',
					'Skipping meals',
				],
			},
		],
	},
	{
		id: 'section-2',
		title: 'Section 2',
		questions: [
			{
				id: 'q-3',
				text: 'What can help reduce study-related anxiety quickly?',
				options: [
					'Deep breathing for 60 seconds',
					'Skipping water',
					'Overloading caffeine',
					'Ignoring signals',
				],
			},
		],
	},
	{
		id: 'section-3',
		title: 'Section 3',
		questions: [
			{
				id: 'q-4',
				text: 'Which habit supports better sleep quality?',
				options: [
					'Keeping a consistent bedtime',
					'Checking notifications all night',
					'Skipping wind-down routines',
					'Heavy late-night meals',
				],
			},
		],
	},
]

const confettiPalette = ['#FEDC97', '#A7D0D6', '#7C9885', '#28666E', '#FFF4DE']

function QuizPage() {
	const navigate = useNavigate()
	const [hasStarted, setHasStarted] = useState(false)
	const [isComplete, setIsComplete] = useState(false)
	const [sectionIndex, setSectionIndex] = useState(0)
	const [questionIndex, setQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState({})

	const totalQuestions = useMemo(
		() => quizData.reduce((total, section) => total + section.questions.length, 0),
		[]
	)

	const currentSection = quizData[sectionIndex]
	const currentQuestion = currentSection.questions[questionIndex]

	const questionNumber = useMemo(() => {
		let count = 0
		for (let i = 0; i < quizData.length; i += 1) {
			if (i < sectionIndex) {
				count += quizData[i].questions.length
			}
		}
		return count + questionIndex + 1
	}, [questionIndex, sectionIndex])

	const questionKey = `${currentSection.id}-${currentQuestion.id}`
	const selectedOption = answers[questionKey]

	const handleSelectOption = (index) => {
		setAnswers((prev) => ({
			...prev,
			[questionKey]: index,
		}))
	}

	const handleTabClick = (index) => {
		setSectionIndex(index)
		setQuestionIndex(0)
	}

	const handleBack = () => {
		if (questionIndex > 0) {
			setQuestionIndex((prev) => prev - 1)
			return
		}

		if (sectionIndex > 0) {
			const previousSectionIndex = sectionIndex - 1
			const previousSection = quizData[previousSectionIndex]
			setSectionIndex(previousSectionIndex)
			setQuestionIndex(previousSection.questions.length - 1)
		}
	}

	const handleNext = () => {
		const isLastQuestion =
			sectionIndex === quizData.length - 1 &&
			questionIndex === currentSection.questions.length - 1

		if (isLastQuestion) {
			setIsComplete(true)
			return
		}

		if (questionIndex < currentSection.questions.length - 1) {
			setQuestionIndex((prev) => prev + 1)
			return
		}

		setSectionIndex((prev) => prev + 1)
		setQuestionIndex(0)
	}

	if (!hasStarted) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#BED4C5] px-6">
				<div className="max-w-lg rounded-3xl bg-[#FFF4DE] p-8 text-center shadow-[0_18px_30px_-20px_rgba(14,29,45,0.6)]">
					<h1 className="text-2xl font-semibold text-[#0E1D2D]">Before you begin</h1>
					<p className="mt-4 text-sm text-[#28666E]">
						This quiz is for educational purposes only and does not diagnose any condition.
					</p>
					<button
						type="button"
						onClick={() => setHasStarted(true)}
						className="mt-6 rounded-full bg-[#204060] px-6 py-2 text-sm font-semibold text-[#FFF4DE]"
					>
						Start Quiz
					</button>
				</div>
			</div>
		)
	}

	if (isComplete) {
		return (
			<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#BED4C5] px-6">
				<div className="relative z-10 rounded-3xl bg-[#FFF4DE] px-10 py-12 text-center shadow-[0_20px_40px_-25px_rgba(14,29,45,0.6)]">
					<p className="text-2xl font-semibold text-[#0E1D2D]">🎉 Yay! You have completed the quiz!</p>
					<button
						type="button"
						onClick={() => navigate('/student-dashboard')}
						className="mt-8 w-full rounded-2xl bg-[#204060] py-4 text-lg font-semibold text-[#FFF4DE] transition hover:opacity-90"
					>
						Home
					</button>
				</div>

				<div className="pointer-events-none absolute inset-0">
					{Array.from({ length: 20 }).map((_, index) => (
						<span
							key={`confetti-${index}`}
							className="absolute h-3 w-3 animate-bounce rounded-sm"
							style={{
								backgroundColor: confettiPalette[index % confettiPalette.length],
								left: `${(index * 11) % 100}%`,
								top: `${(index * 17) % 100}%`,
								animationDelay: `${index * 0.1}s`,
							}}
						/>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-[#BED4C5] px-4 py-8 text-[#0E1D2D] sm:px-8 lg:px-16">
			<div className="mx-auto flex max-w-4xl flex-col items-center">
				{sectionIndex === 0 && questionIndex === 0 ? (
					<div className="mb-3 flex w-full max-w-2xl justify-start">
						<button
							type="button"
							onClick={() => navigate('/student-dashboard')}
							className="rounded-lg bg-[#204060] px-4 py-2 text-xs font-semibold text-[#FFF4DE]"
						>
							Home
						</button>
					</div>
				) : null}
				<div className="mb-6 flex flex-wrap justify-center gap-3">
					{quizData.map((section, index) => (
						<button
							key={section.id}
							type="button"
							onClick={() => handleTabClick(index)}
							className={`rounded-md border px-6 py-1 text-sm font-semibold transition ${
								sectionIndex === index
									? 'border-[#28666E] bg-[#FEDC97] text-[#0E1D2D]'
									: 'border-[#7C9885] bg-[#FFF4DE] text-[#0E1D2D]/70'
							}`}
						>
							{section.title}
						</button>
					))}
				</div>

				<p className="text-sm font-semibold text-[#0E1D2D]">
					Question {questionIndex + 1} / {currentSection.questions.length}
				</p>
				<p className="mt-4 max-w-2xl text-center text-base text-[#0E1D2D]">
					{currentQuestion.text}
				</p>
				<div className="mt-4 h-1 w-16 rounded-full bg-[#7C9885]" />

				<div className="mt-6 flex w-full max-w-md flex-col gap-3">
					{currentQuestion.options.map((option, index) => {
						const isSelected = selectedOption === index
						const label = String.fromCharCode(65 + index)

						return (
							<button
								key={option}
								type="button"
								onClick={() => handleSelectOption(index)}
								className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
									isSelected
										? 'border-[#28666E] bg-[#28666E] text-[#FEDC97]'
										: 'border-[#FFF4DE] bg-[#FFF4DE] text-[#0E1D2D]'
								}`}
							>
								<span className="w-6 text-xs font-bold">{label}</span>
								<span className="flex-1 text-center text-xs sm:text-sm">{option}</span>
							</button>
						)
					})}
				</div>

				<div className="mt-10 flex w-full max-w-2xl items-center justify-between">
					<button
						type="button"
						onClick={handleBack}
						disabled={sectionIndex === 0 && questionIndex === 0}
						className="rounded-lg bg-[#204060] px-6 py-2 text-sm font-semibold text-[#FFF4DE] disabled:cursor-not-allowed disabled:opacity-60"
					>
						Back
					</button>
					<button
						type="button"
						onClick={handleNext}
						className="rounded-lg bg-[#204060] px-6 py-2 text-sm font-semibold text-[#FFF4DE]"
					>
						{sectionIndex === quizData.length - 1 &&
						questionIndex === currentSection.questions.length - 1
							? 'Submit'
							: 'Next'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default QuizPage
