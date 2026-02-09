import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const helplines = [
    {
        title: 'Tele MANAS',
        detail: '24/7 · 14416',
    },
    {
        title: 'Live. Love. Support. Suicide Prevention',
        detail: '24/7 available · 1800-233-7860',
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
        title: 'Sneha Suicide Prevention Helpline',
        detail: '10:00 am to 10:00 pm · 044 2464 0050',
    },
]

const actionCards = [
    { label: 'Take quiz', icon: '/Dash/takeQuiz.png' },
    { label: 'Regulate', icon: '/Dash/regulate.png' },
    { label: 'Personal stats', icon: '/Dash/stats_s.png' },
    { label: 'Journal', icon: '/Dash/journal.png' },
]

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
                    Welcome to MindEase!
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

function CampusPulseCard() {
    return (
        <div className="flex h-full flex-col justify-center rounded-3xl bg-[#FEDC97]/80 p-8 shadow-2xl backdrop-blur-sm">
            <p className="text-xl font-semibold uppercase tracking-[0.2em] text-[#204060]">
                Campus pulse
            </p>
            <div className="mt-6 flex justify-center">
                <span className="animate-pulse-slow text-7xl font-bold text-[#204060] md:text-9xl">
                    60%
                </span>
            </div>
            <p className="mt-6 text-center text-base leading-relaxed text-[#0E1D2D] md:text-lg">
                of your campus crew is dealing with anxiety vibes right now — tough day?
                Totally normal here. Let's breathe through it together!
            </p>
        </div>
    )
}

function FeatureCard({ label, iconSrc, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick ?? (() => { })}
            className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-[#BED4C5]/80 p-6 shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060] md:gap-6 md:p-8"
        >
            <h3 className="text-center text-xl font-semibold text-[#0E1D2D] md:text-2xl">
                {label}
            </h3>
            <img
                src={iconSrc}
                alt={label}
                className="h-20 w-20 object-contain md:h-28 md:w-28"
            />
        </button>
    )
}

export default function StudentDashboard() {
    const navigate = useNavigate()
    const [isHelplineOpen, setIsHelplineOpen] = useState(false)
    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)

    return (
        <div className="relative min-h-screen">
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.08);
                    }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
            <div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
            <div className="flex min-h-screen">
                <Sidebar
                    onHome={() => navigate('/student-dashboard')}
                    onProfile={() => navigate('/student-profile')}
                    onContact={() => navigate('/contact-us')}
                    onLogout={() => navigate('/')}
                />
                <main className="relative flex flex-1 flex-col px-6 py-8 md:px-8">
                    <WelcomeBanner
                        onAnnouncementsClick={() => {
                            setIsAnnouncementOpen(true)
                            setIsHelplineOpen(false)
                        }}
                    />
                    <div className="mt-10 flex flex-1 flex-col gap-8 lg:flex-row lg:gap-10">
                        <div className="flex flex-col lg:w-1/3">
                            <CampusPulseCard />
                        </div>

                        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
                            {actionCards.map((card) => (
                                <FeatureCard
                                    key={card.label}
                                    label={card.label}
                                    iconSrc={card.icon}
                                    onClick={() => {
                                        if (card.label === 'Take quiz') navigate('/quiz')
                                        else if (card.label === 'Regulate') navigate('/breathing-exercises')
                                        else if (card.label === 'Personal stats') navigate('/personal-stats')
                                        else if (card.label === 'Journal') navigate('/journal')
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className={`pointer-events-none absolute right-4 top-4 h-[calc(100%-2rem)] w-full origin-top-right rounded-[28px] bg-[#6F9FA5]/70 p-4 transition duration-300 ease-out lg:w-[55%] ${isHelplineOpen || isAnnouncementOpen
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
                                <div className="mt-4 flex-1 space-y-3 overflow-auto pr-2 text-sm scroll-shadow">
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
                                className={`pointer-events-auto flex h-full w-full flex-col rounded-3xl bg-[#A7D0D6] p-5 text-[#0E1D2D] shadow-[0_20px_36px_-24px_rgba(14,29,45,0.8)] transition duration-300 ease-out ${isHelplineOpen ? 'scale-100' : 'scale-95'
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
                                <div className="mt-4 grid flex-1 gap-3 overflow-auto text-base">
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

                    <button
                        type="button"
                        onClick={() => {
                            setIsHelplineOpen(true)
                            setIsAnnouncementOpen(false)
                        }}
                        className="absolute bottom-8 right-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#204060] text-[#FFF4DE] shadow-[0_16px_28px_-18px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#204060]"
                        aria-label="Quick help"
                    >
                        <img src="/Dash/telephone-fill.png" alt="Helpline" className="h-6 w-6" />

                    </button>

                </main>
            </div>
        </div>
    )
}