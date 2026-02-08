import { Building2, UserCircle2 } from 'lucide-react'

export default function ProfileHeader({ variant = 'student', name, email, uniId }) {
	const isUniversity = variant === 'university'

	return (
		<div className="rounded-3xl bg-[#BED4C5] p-6">
			<div className="flex items-center gap-4">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4DE] text-[#204060]">
					{isUniversity ? (
						<Building2 className="h-9 w-9" aria-hidden="true" />
					) : (
						<UserCircle2 className="h-9 w-9" aria-hidden="true" />
					)}
				</div>
				<div className="space-y-1">
					{isUniversity ? (
						<>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E1D2D]/70">
								Uni ID
							</p>
							<p className="text-sm font-semibold text-[#0E1D2D]">{uniId}</p>
							<p className="text-sm font-semibold text-[#0E1D2D]">{name}</p>
							<p className="text-xs text-[#0E1D2D]/70">{email}</p>
						</>
					) : (
						<>
							<p className="text-sm font-semibold text-[#0E1D2D]">{name}</p>
							<p className="text-xs text-[#0E1D2D]/70">{email}</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
