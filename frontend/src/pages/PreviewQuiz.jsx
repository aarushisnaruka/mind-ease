import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const questions = [
	{
		id: 1,
		text: 'I have felt cheerful and in good spirits.',
	},
	{
		id: 2,
		text: 'I have felt calm and relaxed.',
	},
	{
		id: 3,
		text: 'I have felt active and vigorous.',
	},
	{
		id: 4,
		text: 'I woke up feeling fresh and rested.',
	},
	{
		id: 5,
		text: 'My daily life has been filled with things that interest me.',
	},
]

const options = [
	{ key: '0', label: 'At no time' },
	{ key: '1', label: 'Some of the time' },
	{ key: '2', label: 'Less than half the time' },
	{ key: '3', label: 'More than half the time' },
	{ key: '4', label: 'Most of the time' },
	{ key: '5', label: 'All of the time' },
]

export default function PreviewQuiz() {
	const navigate = useNavigate()

	return (
		<div className="relative min-h-screen">
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
			<div className="flex min-h-screen">
				<Sidebar
					onHome={() => navigate('/university-dashboard')}
					onProfile={() => navigate('/university-profile')}
					onLogout={() => navigate('/')}
					onContact={() => navigate('/contact-us2')}
				/>
				<main className="flex h-screen flex-1 flex-col px-6 py-6">
					{/* Header */}
					<div className="px-1 py-3">
						<h1 className="text-3xl font-semibold text-[#0E1D2D]">
							Preview Quiz
						</h1>
					</div>

					{/* Section Label */}
					<div className="mb-2 px-1">
						<h2 className="text-lg font-semibold text-[#0E1D2D]/80">
							Section 1
						</h2>
					</div>

					{/* Scrollable Question List */}
					<div className="flex-1 overflow-y-auto pr-2 scroll-shadow">
						<div className="grid gap-4 pb-6">
							{questions.map((question) => (
								<section
									key={question.id}
									className="rounded-3xl bg-[#BED4C5] p-4 text-[#0E1D2D] shadow-[0_12px_22px_-18px_rgba(14,29,45,0.7)]"
								>
									<div className="flex items-start gap-3">
										<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF4DE] text-xs font-semibold text-[#0E1D2D]">
											{question.id}
										</div>
										<p className="text-sm text-[#0E1D2D]">{question.text}</p>
									</div>
									<div className="mt-3 grid gap-2 text-xs text-[#0E1D2D] sm:grid-cols-2">
										{options.map((option) => (
											<div
												key={`${question.id}-${option.key}`}
												className="flex items-center gap-2"
											>
												<span className="font-semibold text-[#204060]">
													{option.key}.
												</span>
												<span className="text-[#0E1D2D]/80">
													{option.label}
												</span>
											</div>
										))}
									</div>
								</section>
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}