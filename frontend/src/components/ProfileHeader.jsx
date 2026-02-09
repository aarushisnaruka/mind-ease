import { Building2, UserCircle2 } from 'lucide-react'

export default function ProfileHeader({ variant = 'student', name, email, uniId }) {
	const isUniversity = variant === 'university'

	return (
		<div className={`rounded-3xl bg-[#BED4C5] ${isUniversity ? 'p-10' : 'p-8'}`}>
			<div className="flex items-center gap-6">
				<div
					className={`flex items-center justify-center rounded-full bg-[#FFF4DE] text-[#204060] ${
						isUniversity ? 'h-24 w-24' : 'h-20 w-20'
					}`}
				>
					{isUniversity ? (
						<Building2 className="h-12 w-12" aria-hidden="true" />
					) : (
						<UserCircle2 className="h-10 w-10" aria-hidden="true" />
					)}
				</div>
				<div className="space-y-1">
					{isUniversity ? (
						<>
							<p className="text-base font-semibold uppercase tracking-[0.2em] text-[#0E1D2D]/70">
								Uni ID
							</p>
							<p className="text-xl font-semibold text-[#0E1D2D]">{uniId}</p>
							<p className="text-2xl font-semibold text-[#0E1D2D]">{name}</p>
							<p className="text-lg text-[#0E1D2D]/70">{email}</p>
						</>
					) : (
						<>
							<p className="text-2xl font-semibold text-[#0E1D2D]">{name}</p>
							<p className="text-lg text-[#0E1D2D]/70">{email}</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
