const columns = [
	{ direction: 'up', duration: 104, delay: 0 },
	{ direction: 'down', duration: 98, delay: 2 },
	{ direction: 'up', duration: 100, delay: 1 },
	{ direction: 'down', duration: 102, delay: 0 },
	{ direction: 'up', duration: 99, delay: 2 },
	{ direction: 'down', duration: 100, delay: 1 },
	{ direction: 'up', duration: 104, delay: 0 },
	{ direction: 'down', duration: 101, delay: 2 },
	{ direction: 'up', duration: 103, delay: 1 },
	{ direction: 'down', duration: 99, delay: 0 },
]

// Seeded shuffle function for consistent but different randomization per column
function shuffleWithSeed(array, seed) {
	const shuffled = [...array]
	let currentIndex = shuffled.length
	let random = seed
	
	// Simple seeded random number generator
	const seededRandom = () => {
		random = (random * 9301 + 49297) % 233280
		return random / 233280
	}
	
	while (currentIndex !== 0) {
		const randomIndex = Math.floor(seededRandom() * currentIndex)
		currentIndex--
		;[shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]]
	}
	
	return shuffled
}

function CardColumn({ direction, duration, delay, columnIndex }) {
	// Create array of all 36 emotion images
	const allEmotions = Array.from({ length: 36 }).map((_, index) => ({
		id: index + 1,
		src: `/emoCards/e${index + 1}.png`,
	}))
	
	// Shuffle emotions uniquely for each column based on columnIndex
	const emotions = shuffleWithSeed(allEmotions, columnIndex * 1000 + 42)

	return (
		<div className="relative h-full overflow-hidden">
			{/* Duplicate the emotion cards for seamless infinite scroll */}
			<div
				className={`flex flex-col gap-4 ${
					direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'
				}`}
				style={{
					'--scroll-duration': `${duration}s`,
					'--scroll-delay': `${delay}s`,
				}}
			>
				{[...emotions, ...emotions].map((emotion, index) => (
					<div
						key={`${direction}-${emotion.id}-${index}`}
						className="rounded-3xl border-[0.5px] border-[#FFF4DE]/30 bg-white/20 p-3 shadow-[0_12px_24px_-18px_rgba(14,29,45,0.6)] backdrop-blur-sm transition-transform duration-300 hover:scale-105 overflow-hidden flex items-center justify-center"
						style={{ width: 'clamp(90px, 12vw, 110px)' }}
					>
						<img
							src={emotion.src}
							alt={`Emotion card ${emotion.id}`}
							className="w-full h-auto object-contain"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

function AnimatedBackground() {
	return (
		<div className="absolute inset-0 grid grid-cols-5 gap-6 px-6 py-10 md:grid-cols-10 pointer-events-none">
			{columns.map((column, index) => (
				<CardColumn
					key={`${column.direction}-${index}`}
					direction={column.direction}
					duration={column.duration}
					delay={column.delay}
					columnIndex={index}
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
					<p className="mt-6 text-lg leading-relaxed text-[#FFF4DE]/95 md:text-xl md:leading-relaxed">
						We know university life can feel overwhelming at times. We're here to help students pause, reflect, and better understand their mental well-being through short, thoughtful quizzes.
					</p>
					<p className="mt-4 text-lg leading-relaxed text-[#FFF4DE]/95 md:text-xl md:leading-relaxed">
						At the same time, we help universities see the bigger picture — so support can be offered with care, not judgment.
					</p>
					<p className="mt-6 text-xl font-medium italic leading-relaxed text-[#FEDC97]/90 md:text-xl">
						You are a mountain; thoughts are clouds. They pass — you remain.
					</p>
					<button
						type="button"
						onClick={() => navigate('/role-choice')}
						className="mt-10 w-[180px] h-[52px] text-lg font-semibold bg-[#FEDC97] text-[#0E1D2D] rounded-full border-none cursor-pointer transition-all duration-[400ms] ease-in-out shadow-[0_8px_20px_-6px_rgba(14,29,45,0.4)] hover:-translate-y-[10px] hover:shadow-[0_10px_0_-4px_rgba(254,220,151,0.6),0_20px_0_-8px_rgba(32,64,96,0.5),0_25px_15px_-8px_rgba(32,64,96,0.4)] active:-translate-y-[4px] active:shadow-[0_4px_0_-2px_rgba(254,220,151,0.7),0_10px_0_-6px_rgba(32,64,96,0.6),0_15px_12px_-6px_rgba(32,64,96,0.5)] active:transition-all active:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FEDC97]"
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
