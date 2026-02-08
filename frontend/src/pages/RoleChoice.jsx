import { useNavigate } from 'react-router-dom'

function LoginOptionCard({ label, icon, onSelect }) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className="group flex w-full flex-col items-center gap-3 rounded-3xl border-2 border-[#204060] bg-[#FEDC97] px-6 py-5 text-center text-[#0E1D2D] shadow-[0_12px_24px_-18px_rgba(14,29,45,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-18px_rgba(14,29,45,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#204060]"
		>
			<span className="text-2xl" aria-hidden="true">
				{icon}
			</span>
			<span className="text-sm font-semibold uppercase tracking-[0.12em]">
				{label}
			</span>
		</button>
	)
}

export default function RoleChoice() {
	const navigate = useNavigate()
	const options = [
		{
			label: 'Student Login',
			icon: '🎓',
			onSelect: () => navigate('/student-login'),
		},
		{
			label: 'University Login',
			icon: '🏛️',
			onSelect: () => navigate('/university-login'),
		},
		{
			label: 'Developer Login',
			icon: '🧩',
			onSelect: () => navigate('/developer-login'),
		},
	]

	return (
		<main className="relative min-h-screen overflow-hidden bg-[#FFF4DE]">
			{/* Layered hills for a calm background. */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(167,208,214,0.6),_transparent_55%)]" />
				<div className="absolute -bottom-28 left-0 h-64 w-full rounded-[100%] bg-[#BED4C5]/70" />
				<div className="absolute -bottom-40 left-0 h-72 w-full rounded-[100%] bg-[#A7D0D6]/70" />
				<div className="absolute -bottom-52 left-0 h-80 w-full rounded-[100%] bg-[#6F9FA5]/40" />
			</div>

			<div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
				<div className="w-full max-w-3xl rounded-[32px] border border-[#204060]/20 bg-[#FFF4DE]/90 p-6 shadow-[0_30px_60px_-40px_rgba(14,29,45,0.8)] backdrop-blur-sm sm:p-10">
					<div className="mx-auto w-full max-w-md rounded-2xl bg-[#204060] px-6 py-3 text-center">
						<h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFF4DE]">
							Choose How To Login
						</h1>
					</div>

					<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
						<LoginOptionCard {...options[0]} />
						<LoginOptionCard {...options[1]} />
					</div>
					<div className="mt-6 flex justify-center">
						<div className="w-full max-w-xs">
							<LoginOptionCard {...options[2]} />
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
