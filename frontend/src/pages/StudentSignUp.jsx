import { useNavigate } from 'react-router-dom'

function InputField({ label, type = 'text', placeholder, className = '' }) {
	return (
		<label className={`flex w-full flex-col gap-2 ${className}`}>
			<span className="sr-only">{label}</span>
			<input
				type={type}
				placeholder={placeholder}
				className="w-full rounded-2xl border border-[#204060]/20 bg-[#BED4C5]/40 px-4 py-3 text-sm text-[#0E1D2D] placeholder:text-[#204060]/60 focus:outline-none focus:ring-2 focus:ring-[#6F9FA5]/50"
			/>
		</label>
	)
}

export default function StudentSignUp() {
	const navigate = useNavigate()
	return (
		<main className="relative min-h-screen overflow-hidden">
			{/* Background image */}
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/bg2.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />

			<div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
				<div className="w-full max-w-md rounded-[28px] bg-[#FFF4DE]/95 px-6 py-7 shadow-[0_30px_60px_-40px_rgba(14,29,45,0.8)] sm:px-8">
					<button
						type="button"
						onClick={() => navigate('/')}
						className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#204060] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF4DE] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#204060]"
						aria-label="Back to welcome"
					>
						<svg
							className="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M3 10.5L12 3l9 7.5" />
							<path d="M5 10v10h14V10" />
							<path d="M9 20v-6h6v6" />
						</svg>
						Home
					</button>
					<h1 className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-[#204060]">
						Student Sign-Up
					</h1>

					<div className="mt-5 flex flex-col gap-3">
						<InputField label="Name" placeholder="Name" />
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<InputField label="Registration Number" placeholder="Reg No" />
							<InputField label="Age" type="number" placeholder="Age" />
						</div>
						<InputField label="Email" type="email" placeholder="Email" />
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<InputField label="University Name" placeholder="Uni Name" />
							<InputField label="Branch" placeholder="Branch" />
						</div>
						<InputField label="Password" type="password" placeholder="Password" />
					</div>

					<div className="mt-5 flex justify-center">
						<button
							type="button"
							onClick={() => navigate('/student-login')}
							className="w-full max-w-xs rounded-full bg-[#6F9FA5] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFF4DE] transition hover:bg-[#7C9885] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#204060]"
						>
							Register
						</button>
					</div>
				</div>
			</div>
		</main>
	)
}
