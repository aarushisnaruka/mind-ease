import { useNavigate } from 'react-router-dom'

function InputField({ label, type, placeholder }) {
	return (
		<label className="flex w-full flex-col gap-2 text-sm font-semibold text-[#204060]">
			<span className="sr-only">{label}</span>
			<div className="flex items-center gap-3 rounded-full bg-[#7C9885]/40 px-4 py-3">
				<span
					className="h-8 w-8 rounded-full bg-[#204060]"
					aria-hidden="true"
				/>
				<input
					type={type}
					placeholder={placeholder}
					className="w-full bg-transparent text-base text-[#0E1D2D] placeholder:text-[#204060]/60 focus:outline-none"
				/>
			</div>
		</label>
	)
}

export default function StudentLogin() {
	const navigate = useNavigate()
	return (
		<main className="relative min-h-screen overflow-hidden">
			{/* Background image */}
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />

			<div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
				<div className="w-full max-w-sm rounded-[32px] bg-[#FEDC97] px-6 py-8 shadow-[0_30px_60px_-40px_rgba(14,29,45,0.8)] sm:px-8">
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
						Student Login
					</h1>

					<div className="mt-6 flex flex-col gap-4">
						<InputField label="Email" type="email" placeholder="Email" />
						<p className="text-right text-xs font-medium text-[#204060]/70">
							<button type="button" className="hover:text-[#204060]">
								Forgot Password?
							</button>
						</p>
						<InputField label="Password" type="password" placeholder="Password" />
					</div>

					<div className="mt-6 flex flex-col items-center gap-3">
						<button
							type="button"
							onClick={() => navigate('/student-dashboard')}
							className="w-full rounded-full bg-[#6F9FA5] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFF4DE] transition hover:bg-[#7C9885] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#204060]"
						>
							Login
						</button>
						<span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#204060]/60">
							or
						</span>
						<button
							type="button"
							onClick={() => navigate('/student-signup')}
							className="w-full rounded-full border-2 border-[#6F9FA5] bg-[#FFF4DE] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#204060] transition hover:bg-[#FEDC97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#204060]"
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</main>
	)
}
