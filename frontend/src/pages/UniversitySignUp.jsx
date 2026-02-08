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

export default function UniversitySignUp() {
	const navigate = useNavigate()
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#FFF4DE]">
			{/* Flowing hills background to mirror the university sign-up reference. */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,212,197,0.55),_transparent_55%)]" />
				<div className="absolute -bottom-24 left-0 h-56 w-full rounded-[100%] bg-[#BED4C5]/70" />
				<div className="absolute -bottom-40 left-0 h-72 w-full rounded-[100%] bg-[#A7D0D6]/70" />
				<div className="absolute -bottom-56 left-0 h-80 w-full rounded-[100%] bg-[#6F9FA5]/40" />
			</div>

			<div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
				<div className="w-full max-w-md rounded-[28px] bg-[#FFF4DE]/95 px-6 py-7 shadow-[0_30px_60px_-40px_rgba(14,29,45,0.8)] sm:px-8">
					<h1 className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-[#204060]">
						University Sign-Up
					</h1>

					<div className="mt-5 flex flex-col gap-3">
						<InputField label="University Name" placeholder="Name" />
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<InputField label="City" placeholder="City" />
							<InputField label="State" placeholder="State" />
						</div>
						<InputField label="Email" type="email" placeholder="Email" />
						<InputField label="Branches" placeholder="Branches" />
						<InputField label="Password" type="password" placeholder="Password" />
					</div>

					<div className="mt-5 flex justify-center">
						<button
							type="button"
							onClick={() => navigate('/university-login')}
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
