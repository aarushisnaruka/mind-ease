import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const navItems = ['Home', 'Profile', 'Contact Us', 'Log out']

const helplines = [
	{
		title: 'Live. Love. Support. Suicide Prevention',
		detail: '24/7 available · 1800-233-7860',
	},
	{
		title: 'Sneha Suicide Prevention Helpline',
		detail: '10:00 am to 10:00 pm · 044 2464 0050',
	},
	{
		title: 'MP Drona Lifeline',
		detail: '9:30 am to 6:00 pm · 1800-121-203040',
	},
	{
		title: 'iCall (Tata Institute of Social Sciences)',
		detail: '10:00 am to 8:00 pm · 9152987821',
	},
	{
		title: 'Tele MANAS',
		detail: '24/7 · 14416',
	},
]

const actionCards = [
	{ label: 'Take Quiz', icon: '🧩' },
	{ label: 'Regulate', icon: '🧘' },
	{ label: 'Personal Stats', icon: '📈' },
	{ label: 'Journal', icon: '📓' },
]

function Sidebar({ onLogout, onProfile, onContact }) {
	return (
		<aside className="flex h-screen w-56 flex-col gap-6 bg-[#204060] px-6 py-8 text-[#FFF4DE]">
			<nav className="flex flex-col gap-2 text-sm font-medium">
				{navItems.map((item) => (
					<button
						key={item}
						type="button"
						onClick={
							item === 'Log out'
								? onLogout
								: item === 'Profile'
									? onProfile
									: item === 'Contact Us'
										? onContact
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

function DashboardHeader({ onAnnouncementsClick }) {
	return (
		<section className="relative overflow-hidden rounded-[28px] bg-[#BED4C5]">
			<div
				className="h-40 w-full bg-cover bg-center"
				style={{
					backgroundImage:
						"url('/assets/student-dashboard-header.png')",
				}}
			/>
			<div className="absolute inset-0 bg-[#FFF4DE]/40" />
			<div className="absolute left-6 top-5">
				<h1 className="text-2xl font-semibold text-[#0E1D2D]">Welcome...</h1>
			</div>
			<button
				type="button"
				onClick={onAnnouncementsClick}
				className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#204060] text-[#FFF4DE] shadow-[0_10px_20px_-12px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060]"
				aria-label="Announcements"
			>
				<span aria-hidden="true">📣</span>
			</button>
		</section>
	)
}

function DashboardCard({ children, className = '' }) {
	return (
		<div className={`h-full rounded-3xl ${className}`}>{children}</div>
	)
}

function ActionCard({ label, icon, onClick }) {
	return (
		<button
			type="button"
			onClick={onClick ?? (() => console.log(label))}
			className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl bg-[#BED4C5] px-4 py-6 text-[#0E1D2D] shadow-[0_12px_24px_-18px_rgba(14,29,45,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-18px_rgba(14,29,45,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060]"
		>
			<span className="text-3xl" aria-hidden="true">
				{icon}
			</span>
			<span className="text-sm font-semibold">{label}</span>
		</button>
	)
}

export default function StudentDashboard() {
	const navigate = useNavigate()
	const [isHelplineOpen, setIsHelplineOpen] = useState(false)
	const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)

	return (
		<div className="min-h-screen bg-[#FFF4DE]">
			<div className="flex min-h-screen">
				<Sidebar
					onLogout={() => navigate('/')}
					onProfile={() => navigate('/student-profile')}
					onContact={() => navigate('/contact-us')}
				/>
				<main className="relative flex min-h-screen flex-1 flex-col px-8 py-8">
					<div className="relative flex flex-1 flex-col">
						<DashboardHeader
							onAnnouncementsClick={() => {
								setIsAnnouncementOpen(true)
								setIsHelplineOpen(false)
							}}
						/>

						<div className="mt-6 flex flex-1">
							<div className="grid w-full gap-6 lg:grid-cols-[1.1fr_1.4fr]">
								<DashboardCard className="bg-[#FEDC97] p-6 text-[#0E1D2D]">
									<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
										Campus Pulse
									</p>
									<div className="mt-4 text-5xl font-semibold">60%</div>
									<p className="mt-4 text-sm leading-relaxed text-[#0E1D2D]/80">
										of your campus crew is dealing with anxiety vibes right now —
										totally normal here. Let’s breathe through it together!
									</p>
								</DashboardCard>

								<div className="relative grid gap-4 sm:grid-cols-2">
									<ActionCard label="Take Quiz" icon="🧠" />
									<ActionCard label="Regulate" icon="🧘" />
									<ActionCard
										label="Personal Stats"
										icon="📊"
										onClick={() => navigate('/personal-stats')}
									/>
									<ActionCard
										label="Journal"
										icon="📝"
										onClick={() => navigate('/journal')}
									/>
								</div>
							</div>
						</div>

						<div
							className={`pointer-events-none absolute right-4 top-4 h-[calc(100%-2rem)] w-full origin-top-right rounded-[28px] bg-[#6F9FA5]/70 p-4 transition duration-300 ease-out lg:w-[55%] ${
								isHelplineOpen || isAnnouncementOpen
									? 'opacity-100 scale-100'
									: 'opacity-0 scale-90'
							}`}
							aria-hidden={!isHelplineOpen && !isAnnouncementOpen}
						>
							{isAnnouncementOpen && (
								<div className="pointer-events-auto flex h-full w-full origin-top-right flex-col overflow-hidden rounded-3xl bg-[#BED4C5] p-5 text-[#0E1D2D] shadow-[0_20px_36px_-24px_rgba(14,29,45,0.8)] transition duration-300 ease-out">
									<div className="flex items-center justify-between">
										<h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
											Announcements
										</h2>
										<button
											type="button"
											onClick={() => setIsAnnouncementOpen(false)}
											className="rounded-full bg-[#204060] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF4DE]"
										>
											Close
										</button>
									</div>
									<div className="mt-4 flex-1 space-y-3 overflow-auto pr-2 text-xs scroll-shadow">
										<div className="rounded-2xl bg-[#FFF4DE] p-3">
											<p className="font-semibold text-[#204060]">MindEase Update</p>
											<p className="mt-1 text-[#0E1D2D]/70">
												This week is about YOU. Mental health awareness week is here!
												Join the campus mood board or drop a note for a friend.
											</p>
										</div>
										<div className="rounded-2xl bg-[#FFF4DE] p-3">
											<p className="font-semibold text-[#204060]">Campus Check-in</p>
											<p className="mt-1 text-[#0E1D2D]/70">
												Quick breathing break at 4:00 pm in the green room. Bring a
												friend or join solo.
											</p>
										</div>
										<div className="rounded-2xl bg-[#FFF4DE] p-3">
											<p className="font-semibold text-[#204060]">Mood Pulse</p>
											<p className="mt-1 text-[#0E1D2D]/70">
												Take the 2-minute pulse check to help shape next week’s
												activities.
											</p>
										</div>
									</div>
								</div>
							)}
							{isHelplineOpen && (
								<div
									className={`pointer-events-auto flex h-full w-full flex-col rounded-3xl bg-[#A7D0D6] p-5 text-[#0E1D2D] shadow-[0_20px_36px_-24px_rgba(14,29,45,0.8)] transition duration-300 ease-out ${
										isHelplineOpen ? 'scale-100' : 'scale-95'
									}`}
								>
									<div className="flex items-center justify-between">
										<h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
											Emergency Helpline Numbers
										</h2>
										<button
											type="button"
											onClick={() => setIsHelplineOpen(false)}
											className="rounded-full bg-[#204060] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF4DE]"
										>
											Close
										</button>
									</div>
									<div className="mt-4 grid flex-1 gap-3 overflow-auto text-xs">
										{helplines.map((helpline) => (
											<div
												key={helpline.title}
												className="rounded-2xl bg-[#FFF4DE] p-3"
											>
												<p className="font-semibold text-[#204060]">
													{helpline.title}
												</p>
												<p className="mt-1 text-[#0E1D2D]/70">
													{helpline.detail}
												</p>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					<button
						type="button"
						onClick={() => {
							setIsHelplineOpen(true)
							setIsAnnouncementOpen(false)
						}}
						className="absolute bottom-8 right-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#204060] text-[#FFF4DE] shadow-[0_16px_28px_-18px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060]"
						aria-label="Quick help"
					>
						<span aria-hidden="true">📞</span>
					</button>

				</main>
			</div>
		</div>
	)
}
