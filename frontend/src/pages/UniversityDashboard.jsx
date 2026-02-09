import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

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
	{ label: 'Preview Quiz', icon: '/Dash/previewQuiz.png' },
	{ label: 'Institute Stats', icon: '/Dash/stats_s.png' },
]

function Sidebar({ onLogout, onProfile, onContact }) {
	return (
		<aside className="hidden h-screen w-56 flex-col gap-6 bg-[#204060] px-6 py-8 text-[#FFF4DE] lg:flex">
			<div className="flex flex-col items-center gap-3">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4DE] text-[#204060]">
					<GraduationCap className="h-8 w-8" aria-hidden="true" />
				</div>
				<p className="text-xs font-semibold uppercase tracking-[0.2em]">
					MindEase
				</p>
			</div>
			<nav className="flex flex-col gap-2">
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

function WelcomeBanner({ onAnnouncementsClick }) {
	return (
		<div className="relative h-48 w-full overflow-hidden rounded-3xl shadow-xl md:h-56">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: "url('/Dash/welcome_bg.png')",
				}}
			/>
			<div className="absolute inset-0 bg-black/10" />
			<div className="absolute inset-0 flex items-center justify-start px-8 md:px-10">
				<h1 className="font-serif text-4xl font-semibold text-[#204060] drop-shadow-lg md:text-6xl">
					Welcome...
				</h1>
			</div>
			<button
				type="button"
				onClick={onAnnouncementsClick}
				className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#204060] shadow-lg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEDC97]"
				aria-label="Announcements"
			>
				<img src="/Dash/announcements.png" alt="Announcements" className="h-6 w-6" />
			</button>
		</div>
	)
}

function DashboardCard({ children, className = '' }) {
	return <div className={`h-full rounded-3xl ${className}`}>{children}</div>
}

function ActionCard({ label, icon, onClick }) {
	return (
		<button
			type="button"
			onClick={onClick ?? (() => console.log(label))}
			className="flex h-full w-full items-center justify-between gap-4 rounded-3xl bg-[#BED4C5]/80 px-8 py-8 text-[#0E1D2D] shadow-[0_12px_24px_-18px_rgba(14,29,45,0.5)] transition hover:scale-105 hover:shadow-[0_16px_28px_-18px_rgba(14,29,45,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060]"
		>
			<span className="text-2xl font-semibold md:text-3xl">{label}</span>
			<img src={icon} alt="" className="h-28 w-28 md:h-32 md:w-32" aria-hidden="true" />
		</button>
	)
}

export default function UniversityDashboard() {
	const navigate = useNavigate()
	const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)
	const [announcementTitle, setAnnouncementTitle] = useState('')
	const [announcementText, setAnnouncementText] = useState('')
	const [announcementItems, setAnnouncementItems] = useState(
		initialAnnouncements,
	)

	const handlePostAnnouncement = () => {
		const titleTrimmed = announcementTitle.trim()
		const bodyTrimmed = announcementText.trim()
		if (!bodyTrimmed) return
		setAnnouncementItems((current) => [
			{
				title: titleTrimmed || 'New Announcement',
				body: bodyTrimmed,
			},
			...current,
		])
		setAnnouncementTitle('')
		setAnnouncementText('')
	}

	return (
		<div className="relative min-h-screen">
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
			<div className="flex min-h-screen">
				<Sidebar
					onLogout={() => navigate('/')}
					onProfile={() => navigate('/university-profile')}
					onContact={() => navigate('/contact-us2')}
				/>
				<main className="relative flex min-h-screen flex-1 flex-col px-8 py-8">
					<div className="relative flex flex-1 flex-col">
						<WelcomeBanner
							onAnnouncementsClick={() => setIsAnnouncementOpen(true)}
						/>

						<div className="mt-6 flex flex-1">
						<div className="grid w-full gap-6 lg:grid-cols-2">
							<DashboardCard className="bg-[#FEDC97]/80 p-8 text-[#0E1D2D] shadow-2xl backdrop-blur-sm">
								<p className="text-base font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Campus Pulse
								</p>
								<div className="mt-6 text-8xl font-semibold">60%</div>
								<p className="mt-6 text-base leading-relaxed text-[#0E1D2D]/80">
									of students feeling down right now — big number! Time for more
									check-ins?
								</p>
							</DashboardCard>

							<div className="grid gap-6">
								{actionCards.map((card) => (
									<ActionCard
										key={card.label}
										{...card}
										onClick={
											card.label === 'Institute Stats'
												? () => navigate('/university-stats')
												: card.label === 'Preview Quiz'
													? () => navigate('/preview-quiz')
													: undefined
										}
									/>
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
									<h2 className="text-base font-semibold uppercase tracking-[0.2em]">
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
								<div className="mt-4 flex-1 space-y-3 overflow-auto pr-2 text-sm scroll-shadow">
									{announcementItems.map((item) => (
										<div key={item.title} className="rounded-2xl bg-[#FFF4DE] p-3">
											<p className="font-semibold text-[#204060]">{item.title}</p>
											<p className="mt-1 text-[#0E1D2D]/70">{item.body}</p>
										</div>
									))}
								</div>
								<div className="mt-4 flex flex-col gap-2 rounded-2xl bg-[#FFF4DE] p-2">
									<input
										type="text"
										placeholder="Announcement title"
										value={announcementTitle}
										onChange={(event) => setAnnouncementTitle(event.target.value)}
										className="w-full bg-transparent px-2 text-sm font-semibold text-[#204060] placeholder:text-[#204060]/60 focus:outline-none"
									/>
									<div className="flex items-center gap-2">
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
											className="w-full bg-transparent px-2 text-sm text-[#0E1D2D] placeholder:text-[#204060]/60 focus:outline-none"
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
					</div>

					{}
				</main>
			</div>
		</div>
	)
}
