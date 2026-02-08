import { GraduationCap } from 'lucide-react'

const navItems = ['Home', 'Profile', 'Contact Us', 'Logout']

export default function Sidebar({ onLogout, onContact, onHome, onProfile }) {
	return (
		<aside className="flex h-screen w-56 flex-col gap-6 bg-[#204060] px-6 py-8 text-[#FFF4DE]">
			<div className="flex flex-col items-center gap-3">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4DE] text-[#204060]">
					<GraduationCap className="h-8 w-8" aria-hidden="true" />
				</div>
				<p className="text-xs font-semibold uppercase tracking-[0.2em]">
					MindEase
				</p>
			</div>
			<nav className="flex flex-col gap-2 text-sm font-medium">
				{navItems.map((item) => (
					<button
						key={item}
						type="button"
						onClick={
							item === 'Logout'
								? onLogout
								: item === 'Contact Us'
									? onContact
									: item === 'Home'
										? onHome
										: item === 'Profile'
											? onProfile
											: undefined
						}
						className="rounded-xl px-3 py-2 text-left transition hover:bg-[#0E1D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF4DE]"
					>
						{item}
					</button>
				))}
			</nav>
		</aside>
	)
}
