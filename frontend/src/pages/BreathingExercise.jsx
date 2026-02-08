import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const exercises = [
	{
		id: 'belly',
		title: 'Belly Breathing',
		description: 'Slow belly expansion to steady your nervous system.',
		phases: [
			{ label: 'Inhale', duration: 5, scaleStart: 0.75, scaleEnd: 1 },
			{ label: 'Exhale', duration: 5, scaleStart: 1, scaleEnd: 0.75 },
		],
	},
	{
		id: '478',
		title: '4-7-8 Breathing',
		description: 'Inhale 4, hold 7, exhale 8 for deep calm.',
		phases: [
			{ label: 'Inhale', duration: 4, scaleStart: 0.7, scaleEnd: 1 },
			{ label: 'Hold', duration: 7, scaleStart: 1, scaleEnd: 1 },
			{ label: 'Exhale', duration: 8, scaleStart: 1, scaleEnd: 0.7 },
		],
	},
	{
		id: 'box',
		title: 'Box Breathing (4-4-4-4)',
		description: 'Equal counts to reset focus and regulate stress.',
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
		description: 'Two inhales followed by a long releasing exhale.',
		phases: [
			{ label: 'Inhale', duration: 3, scaleStart: 0.7, scaleEnd: 0.95 },
			{ label: 'Inhale (sip)', duration: 1, scaleStart: 0.95, scaleEnd: 1.05 },
			{ label: 'Exhale', duration: 6, scaleStart: 1.05, scaleEnd: 0.7 },
		],
	},
	{
		id: 'pursed',
		title: 'Pursed-Lip Breathing',
		description: 'Quick inhale, slow controlled exhale.',
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
		<div className="min-h-screen bg-[#FFF4DE]">
			<div className="flex min-h-screen">
				<Sidebar
					onHome={() => navigate('/student-dashboard')}
					onProfile={() => navigate('/student-profile')}
					onLogout={() => navigate('/')}
					onContact={() => navigate('/contact-us')}
				/>
				<main className="flex flex-1 flex-col px-6 py-6">
					<h1 className="text-2xl font-semibold text-[#0E1D2D]">
						Breathing exercises
					</h1>

					<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{exercises.map((exercise) => (
							<button
								key={exercise.id}
								type="button"
								onClick={() => setActiveExerciseId(exercise.id)}
								className="rounded-3xl bg-[#BED4C5] p-4 text-left text-[#0E1D2D] shadow-[0_12px_22px_-18px_rgba(14,29,45,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-18px_rgba(14,29,45,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
							>
								<p className="text-sm font-semibold text-[#204060]">
									{exercise.title}
								</p>
								<p className="mt-2 text-xs text-[#0E1D2D]/70">
									{exercise.description}
								</p>
							</button>
						))}
					</div>

					{activeExercise ? (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1D2D]/50 px-4 py-8">
							<div className="relative w-full max-w-sm rounded-3xl bg-[#FEDC97] p-6 text-[#0E1D2D] shadow-[0_20px_36px_-24px_rgba(14,29,45,0.7)]">
								<button
									type="button"
									onClick={() => setActiveExerciseId(null)}
									className="absolute right-4 top-4 rounded-full bg-[#204060] px-3 py-1 text-xs font-semibold text-[#FFF4DE]"
								>
									Close
								</button>
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									{activeExercise.title}
								</p>
								<div className="mt-6 flex flex-col items-center gap-4">
									<div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[#BED4C5]">
										<div
											className="flex h-24 w-24 items-center justify-center rounded-full bg-[#6F9FA5] transition-transform duration-1000 ease-in-out"
											style={{ transform: `scale(${innerScale})` }}
										>
											<span className="text-xs font-semibold text-[#FFF4DE]">
												{currentPhase?.label ?? 'Ready'}
											</span>
										</div>
									</div>
									<div className="text-center">
										<p className="text-sm font-semibold text-[#204060]">
											{currentPhase?.label ?? 'Ready'}
										</p>
										<p className="mt-1 text-3xl font-semibold text-[#0E1D2D]">
											{secondsLeft || currentPhase?.duration}
										</p>
									</div>
								</div>

								<div className="mt-6 flex items-center justify-between">
									<button
										type="button"
										onClick={handleReset}
										className="rounded-2xl bg-[#204060] px-4 py-2 text-sm font-semibold text-[#FFF4DE] shadow-[0_12px_20px_-16px_rgba(14,29,45,0.7)]"
									>
										Reset
									</button>
									<button
										type="button"
										onClick={() => setIsRunning((current) => !current)}
										className="rounded-2xl bg-[#28666E] px-4 py-2 text-sm font-semibold text-[#FFF4DE] shadow-[0_12px_20px_-16px_rgba(14,29,45,0.7)]"
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
