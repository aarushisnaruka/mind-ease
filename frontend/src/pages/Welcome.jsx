const CARD_COLORS = [
	'bg-[#6F9FA5]/40',
	'bg-[#BED4C5]/50',
	'bg-[#A7D0D6]/45',
	'bg-[#7C9885]/45',
	'bg-[#FEDC97]/35',
	'bg-[#FFF4DE]/35',
]

const columns = [
	{ direction: 'up', duration: 42, delay: 0 },
	{ direction: 'down', duration: 48, delay: 2 },
	{ direction: 'up', duration: 44, delay: 1 },
	{ direction: 'down', duration: 50, delay: 0 },
	{ direction: 'up', duration: 46, delay: 3 },
]

function CardColumn({ direction, duration, delay }) {
	const cards = Array.from({ length: 6 }).map((_, index) => ({
		id: index,
		color: CARD_COLORS[index % CARD_COLORS.length],
	}))

	return (
		<div className="relative h-full overflow-hidden">
			{/* Duplicate the card stack so the scroll loop is seamless. */}
			<div
				className={`flex flex-col gap-4 ${
					direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'
				}`}
				style={{
					'--scroll-duration': `${duration}s`,
					'--scroll-delay': `${delay}s`,
				}}
			>
				{[...cards, ...cards].map((card, index) => (
					<div
						key={`${direction}-${card.id}-${index}`}
						className={`rounded-3xl border border-[#FFF4DE]/40 ${card.color} p-4 shadow-[0_12px_24px_-18px_rgba(14,29,45,0.6)] backdrop-blur-sm`}
					>
						<div className="flex items-center justify-between px-2">
							<span className="h-3 w-3 rounded-full bg-[#204060]/60" />
							<span className="h-3 w-3 rounded-full bg-[#204060]/60" />
						</div>
						<div className="mt-3 flex justify-center">
							<span className="h-2 w-10 rounded-full bg-[#204060]/40" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

function AnimatedBackground() {
	return (
		<div className="absolute inset-0 grid grid-cols-3 gap-6 px-6 py-10 md:grid-cols-5 pointer-events-none">
			{columns.map((column, index) => (
				<CardColumn
					key={`${column.direction}-${index}`}
					direction={column.direction}
					duration={column.duration}
					delay={column.delay}
				/>
			))}
		</div>
	)
}

import { useNavigate } from 'react-router-dom'

function WaveSection() {
	const navigate = useNavigate()

	return (
		<section className="wave-rise absolute inset-x-0 bottom-0 z-10">
			<div className="relative flex h-[60vh] items-center justify-center bg-[#204060] px-6">
				<svg
					className="absolute -top-16 left-0 h-16 w-full"
					viewBox="0 0 1440 160"
					preserveAspectRatio="none"
					aria-hidden="true"
				>
					<path
						fill="#204060"
						d="M0,96 C120,140 240,36 360,80 C480,124 600,24 720,68 C840,112 960,40 1080,76 C1200,112 1320,56 1440,92 L1440,160 L0,160 Z"
					/>
				</svg>
				<div className="relative z-10 max-w-2xl text-center text-[#FFF4DE]">
					<p className="text-sm uppercase tracking-[0.35em] text-[#FEDC97]">
						MindEase
					</p>
					<h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">
						Welcome
					</h1>
					<p className="mt-5 text-lg text-[#FFF4DE]/90 md:text-xl">
						You are not alone. Let us take this step together, gently and at
						your pace.
					</p>
					<button
						type="button"
						onClick={() => navigate('/role-choice')}
						className="mt-8 rounded-full bg-[#FEDC97] px-8 py-3 text-base font-semibold text-[#0E1D2D] shadow-[0_12px_30px_-18px_rgba(14,29,45,0.9)] transition hover:bg-[#FFF4DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FEDC97]"
					>
						Get Started
					</button>
				</div>
			</div>
		</section>
	)
}

export default function Welcome() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#FFF4DE]">
			<AnimatedBackground />
			<WaveSection />
		</main>
	)
}
