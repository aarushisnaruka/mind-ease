import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const navItems = ['Home', 'Profile', 'Contact Us', 'Log out']

const initialAnnouncements = [
	{
		title: 'Wellness Week',
		body: 'Student check-ins are open. Encourage advisors to host 10-minute chats this week.',
	},
	{
		title: 'Quiz Preview',
		body: 'Preview the new 5-question pulse quiz before it goes live on Monday.',
	},
	{
		title: 'Support Plan',
		body: 'Reminder: update your campus support resources in the admin panel by Friday.',
	},
]

const actionCards = [
	{ label: 'Preview Quiz', icon: '🧠' },
	{ label: 'University Stats', icon: '📊' },
]

function Sidebar({ onLogout }) {
	return (
		<aside className="flex h-screen w-56 flex-col gap-6 bg-[#204060] px-6 py-8 text-[#FFF4DE]">
			<nav className="flex flex-col gap-2 text-sm font-medium">
				{navItems.map((item) => (
					<button
						key={item}
						type="button"
						onClick={item === 'Log out' ? onLogout : undefined}
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
				className="h-36 w-full bg-cover bg-center"
				style={{
					backgroundImage:
						"url('/assets/university-dashboard-header.png')",
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
	return <div className={`h-full rounded-3xl ${className}`}>{children}</div>
}

function ActionCard({ label, icon }) {
	return (
		<button
			type="button"
			onClick={() => console.log(label)}
			className="flex h-full w-full items-center justify-between gap-4 rounded-3xl bg-[#BED4C5] px-5 py-6 text-[#0E1D2D] shadow-[0_12px_24px_-18px_rgba(14,29,45,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-18px_rgba(14,29,45,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060]"
		>
			<span className="text-sm font-semibold">{label}</span>
			<span className="text-3xl" aria-hidden="true">
				{icon}
			</span>
		</button>
	)
}

export default function UniversityDashboard() {
	const navigate = useNavigate()
	const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)
	const [announcementText, setAnnouncementText] = useState('')
	const [announcementItems, setAnnouncementItems] = useState(
		initialAnnouncements,
	)

	const handlePostAnnouncement = () => {
		const trimmed = announcementText.trim()
		if (!trimmed) return
		setAnnouncementItems((current) => [
			{
				title: 'New Announcement',
				body: trimmed,
			},
			...current,
		])
		setAnnouncementText('')
	}

	return (
		<div className="min-h-screen bg-[#FFF4DE]">
			<div className="flex min-h-screen">
				<Sidebar onLogout={() => navigate('/')} />
				<main className="relative flex min-h-screen flex-1 flex-col px-8 py-8">
					<div className="relative flex flex-1 flex-col">
						<DashboardHeader
							onAnnouncementsClick={() => setIsAnnouncementOpen(true)}
						/>

						<div className="mt-6 flex flex-1">
							<div className="grid w-full gap-6 lg:grid-cols-[1.1fr_1fr]">
								<DashboardCard className="bg-[#FEDC97] p-6 text-[#0E1D2D]">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Campus Pulse
								</p>
								<div className="mt-4 text-5xl font-semibold">60%</div>
								<p className="mt-4 text-sm leading-relaxed text-[#0E1D2D]/80">
									of students feeling down right now — big number! Time for more
									check-ins?
								</p>
							</DashboardCard>

							<div className="grid gap-4">
								{actionCards.map((card) => (
									<ActionCard key={card.label} {...card} />
								))}
							</div>
						</div>
						</div>

						<div
							className={`pointer-events-none absolute right-4 top-4 h-[calc(100%-2rem)] w-full origin-top-right rounded-[28px] bg-[#6F9FA5]/70 p-4 transition duration-300 ease-out lg:w-[55%] ${
								isAnnouncementOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
							}`}
							aria-hidden={!isAnnouncementOpen}
						>
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
									{announcementItems.map((item, index) => (
										<div key={item.title} className="rounded-2xl bg-[#FFF4DE] p-3">
											<p className="font-semibold text-[#204060]">{item.title}</p>
											<p className="mt-1 text-[#0E1D2D]/70">{item.body}</p>
										</div>
									))}
								</div>
								<div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#FFF4DE] p-2">
									<input
										type="text"
										placeholder="Write an announcement..."
										value={announcementText}
										onChange={(event) => setAnnouncementText(event.target.value)}
										onKeyDown={(event) => {
											if (event.key === 'Enter') {
												handlePostAnnouncement()
											}
										}}
										className="w-full bg-transparent px-2 text-xs text-[#0E1D2D] placeholder:text-[#204060]/60 focus:outline-none"
									/>
									<button
										type="button"
										onClick={handlePostAnnouncement}
										className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#204060] text-[#FFF4DE] shadow-[0_10px_18px_-12px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060]"
										aria-label="Post announcement"
									>
										<span aria-hidden="true">📣</span>
									</button>
								</div>
							</div>
						</div>
					</div>

					<button
						type="button"
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

