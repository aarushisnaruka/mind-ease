import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const contactNumbers = [
	'+91 9172842350',
	'+91 8764242496',
	'+91 9582829977',
	'+91 7870283609',
	'+91 9369255340',
]

export default function ContactUs() {
	const navigate = useNavigate()
	const [feedback, setFeedback] = useState('')
	const [submittedFeedback, setSubmittedFeedback] = useState('')

	const handleSubmit = () => {
		const trimmed = feedback.trim()
		if (!trimmed) return
		setSubmittedFeedback(trimmed)
	}

	return (
		<div className="min-h-screen bg-[#FFF4DE]">
			<div className="flex min-h-screen">
				<Sidebar
					onHome={() => navigate('/student-dashboard')}
					onProfile={() => navigate('/student-profile')}
					onLogout={() => navigate('/')}
					onContact={() => navigate('/contact-us')}
				/>
				<main className="flex flex-1 flex-col px-6 py-6">
					<div className="rounded-3xl bg-[#BED4C5] px-6 py-4 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
						<h1 className="text-2xl font-semibold text-[#0E1D2D]">
							Contact us
						</h1>
					</div>

					<div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[1.3fr_0.9fr]">
						<section className="flex">
							<div className="flex h-full flex-1 flex-col rounded-3xl bg-[#FEDC97] p-5 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<h2 className="text-lg font-semibold text-[#0E1D2D]">
									Give us your feedback
								</h2>
								<textarea
									value={feedback}
									onChange={(event) => setFeedback(event.target.value)}
									placeholder="Share your thoughts..."
									className="mt-4 flex-1 w-full resize-none rounded-2xl border border-[#7C9885]/70 bg-[#FFF4DE] px-4 py-3 text-sm text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]"
									aria-label="Feedback"
								/>
								<div className="mt-4 flex justify-end">
									<button
										type="button"
										onClick={handleSubmit}
										className="rounded-2xl bg-[#28666E] px-5 py-2 text-sm font-semibold text-[#FFF4DE] shadow-[0_12px_20px_-16px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
									>
										Upload / Submit
									</button>
								</div>
							</div>
						</section>

						<aside className="grid gap-6">
							<div className="rounded-3xl bg-[#BED4C5] p-4 text-[#0E1D2D] shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									email
								</p>
								<div className="mt-2 space-y-1 text-base text-[#0E1D2D]">
									<p>mindease@gmail.com</p>
									<p>support@mindease.com</p>
									<p>hello@mindease.com</p>
								</div>
							</div>
								<div className="rounded-3xl bg-[#BED4C5] p-5 text-[#0E1D2D] shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
									<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
										Feedback Preview
									</p>
								<p className="mt-3 text-base text-[#0E1D2D]/80">
										{submittedFeedback || 'Your feedback will appear here after submitting.'}
									</p>
								</div>
						</aside>
					</div>
				</main>
			</div>
		</div>
	)
}
