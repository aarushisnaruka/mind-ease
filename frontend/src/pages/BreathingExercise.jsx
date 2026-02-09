import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const exercises = [
	{
		id: 'belly',
		title: 'Belly Breathing',
		description:
			'Slow, deep breathing where your belly rises as you inhale and falls as you exhale. Helps calm the nervous system and reduce anxiety.',
		phases: [
			{ label: 'Inhale', duration: 5, scaleStart: 0.75, scaleEnd: 1 },
			{ label: 'Exhale', duration: 5, scaleStart: 1, scaleEnd: 0.75 },
		],
	},
	{
		id: '478',
		title: '4-7-8 Breathing',
		description:
			'Inhale for 4 seconds, hold for 7, and exhale slowly for 8. Great for calming the mind during stress or before sleep.',
		phases: [
			{ label: 'Inhale', duration: 4, scaleStart: 0.7, scaleEnd: 1 },
			{ label: 'Hold', duration: 7, scaleStart: 1, scaleEnd: 1 },
			{ label: 'Exhale', duration: 8, scaleStart: 1, scaleEnd: 0.7 },
		],
	},
	{
		id: 'box',
		title: 'Box Breathing (4-4-4-4)',
		description:
			'Equal inhale, hold, exhale, and hold—each for 4 seconds. Helps regain control and focus when feeling overwhelmed.',
		phases: [
			{ label: 'Inhale', duration: 4, scaleStart: 0.7, scaleEnd: 1 },
			{ label: 'Hold', duration: 4, scaleStart: 1, scaleEnd: 1 },
			{ label: 'Exhale', duration: 4, scaleStart: 1, scaleEnd: 0.7 },
			{ label: 'Hold', duration: 4, scaleStart: 0.7, scaleEnd: 0.7 },
		],
	},
	{
		id: 'cyclic',
		title: 'Cyclic Sighing',
		description:
			'A deep inhale followed by a short second sip of air, then a long slow exhale. Excellent for improving mood and relaxation.',
		phases: [
			{ label: 'Inhale', duration: 3, scaleStart: 0.7, scaleEnd: 0.95 },
			{ label: 'Inhale (sip)', duration: 1, scaleStart: 0.95, scaleEnd: 1.05 },
			{ label: 'Exhale', duration: 6, scaleStart: 1.05, scaleEnd: 0.7 },
		],
	},
	{
		id: 'pursed',
		title: 'Pursed-Lip Breathing',
		description:
			'Inhale through the nose and exhale slowly through pursed lips. Useful during panic or shortness of breath.',
		phases: [
			{ label: 'Inhale', duration: 2, scaleStart: 0.7, scaleEnd: 0.95 },
			{ label: 'Exhale', duration: 4, scaleStart: 0.95, scaleEnd: 0.7 },
		],
	},
]

export default function BreathingExercise() {
	const navigate = useNavigate()
	const [activeExerciseId, setActiveExerciseId] = useState(null)
	const [phaseIndex, setPhaseIndex] = useState(0)
	const [secondsLeft, setSecondsLeft] = useState(0)
	const [isRunning, setIsRunning] = useState(false)

	const activeExercise = useMemo(
		() => exercises.find((item) => item.id === activeExerciseId) ?? null,
		[activeExerciseId],
	)

	useEffect(() => {
		if (!activeExercise) return
		const firstPhase = activeExercise.phases[0]
		setPhaseIndex(0)
		setSecondsLeft(firstPhase.duration)
		setIsRunning(false)
	}, [activeExerciseId, activeExercise])

	useEffect(() => {
		if (!activeExercise || !isRunning) return
		const timer = setInterval(() => {
			setSecondsLeft((current) => {
				if (current > 1) return current - 1
				setPhaseIndex((prev) => {
					const nextIndex = (prev + 1) % activeExercise.phases.length
					setSecondsLeft(activeExercise.phases[nextIndex].duration)
					return nextIndex
				})
				return current
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [activeExercise, isRunning])

	const currentPhase = activeExercise?.phases[phaseIndex]
	const phaseProgress = useMemo(() => {
		if (!currentPhase) return 0
		return (currentPhase.duration - secondsLeft) / currentPhase.duration
	}, [currentPhase, secondsLeft])

	const innerScale = useMemo(() => {
		if (!currentPhase) return 0.7
		return (
			currentPhase.scaleStart +
			(currentPhase.scaleEnd - currentPhase.scaleStart) *
				Math.min(Math.max(phaseProgress, 0), 1)
		)
	}, [currentPhase, phaseProgress])

	const handleReset = () => {
		if (!activeExercise) return
		setIsRunning(false)
		setPhaseIndex(0)
		setSecondsLeft(activeExercise.phases[0].duration)
	}

	return (
		<div className="relative min-h-screen">
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
			<div className="flex min-h-screen">
				<Sidebar
					onHome={() => navigate('/student-dashboard')}
					onProfile={() => navigate('/student-profile')}
					onLogout={() => navigate('/')}
					onContact={() => navigate('/contact-us')}
				/>
				<main className="flex flex-1 flex-col px-10 py-10">
					<h1 className="text-5xl font-semibold text-[#0E1D2D]">
						Breathing exercises
					</h1>

					<div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{exercises.map((exercise) => (
							<button
								key={exercise.id}
								type="button"
								onClick={() => setActiveExerciseId(exercise.id)}
								className="aspect-[5/3] rounded-3xl bg-[#BED4C5] p-8 text-center text-[#0E1D2D] shadow-[0_12px_22px_-18px_rgba(14,29,45,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-18px_rgba(14,29,45,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
							>
								<div className="flex h-full flex-col items-center justify-center">
									<p className="text-2xl font-semibold text-[#204060]">
									{exercise.title}
									</p>
									<p className="mt-4 text-lg text-[#0E1D2D]/70">
									{exercise.description}
									</p>
								</div>
							</button>
						))}
					</div>

					{activeExercise ? (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1D2D]/50 px-4 py-8">
							<div className="relative w-full max-w-lg rounded-3xl bg-[#FEDC97] p-10 text-[#0E1D2D] shadow-[0_20px_36px_-24px_rgba(14,29,45,0.7)]">
								<button
									type="button"
									onClick={() => setActiveExerciseId(null)}
									className="absolute right-4 top-4 rounded-full bg-[#204060] px-5 py-2 text-base font-semibold text-[#FFF4DE]"
								>
									Close
								</button>
								<p className="text-lg font-semibold uppercase tracking-[0.2em] text-[#204060]">
									{activeExercise.title}
								</p>
								<div className="mt-10 flex flex-col items-center gap-8">
									<div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[#BED4C5]">
										<div
												className="flex h-40 w-40 items-center justify-center rounded-full bg-[#6F9FA5] transition-transform duration-1000 ease-in-out"
											style={{ transform: `scale(${innerScale})` }}
										>
												<span className="text-base font-semibold text-[#FFF4DE]">
												{currentPhase?.label ?? 'Ready'}
											</span>
										</div>
									</div>
									<div className="text-center">
											<p className="text-lg font-semibold text-[#204060]">
											{currentPhase?.label ?? 'Ready'}
										</p>
											<p className="mt-3 text-5xl font-semibold text-[#0E1D2D]">
											{secondsLeft || currentPhase?.duration}
										</p>
									</div>
								</div>

									<div className="mt-10 flex items-center justify-between">
									<button
										type="button"
										onClick={handleReset}
											className="rounded-2xl bg-[#204060] px-6 py-3.5 text-lg font-semibold text-[#FFF4DE] shadow-[0_12px_20px_-16px_rgba(14,29,45,0.7)]"
									>
										Reset
									</button>
									<button
										type="button"
										onClick={() => setIsRunning((current) => !current)}
											className="rounded-2xl bg-[#28666E] px-6 py-3.5 text-lg font-semibold text-[#FFF4DE] shadow-[0_12px_20px_-16px_rgba(14,29,45,0.7)]"
									>
										{isRunning ? 'Pause' : 'Start'}
									</button>
								</div>
							</div>
						</div>
					) : null}
				</main>
			</div>
		</div>
	)
}
