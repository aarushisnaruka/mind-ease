import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const promptText = 'Reflect on something that made you feel calm today...'
const promptOptions = [
	promptText,
	'What helped you feel supported or connected today?',
	'Name one small win you want to remember from today.',
	'Describe a moment when you felt present and grounded.',
]

const initialEntries = [
	{
		id: 1,
		title: 'Day 1 - Gratitude',
		body: 'Noticed the sunlight during my walk and felt grounded.',
	},
	{
		id: 2,
		title: 'Stress at Work',
		body: 'Took a short break and reset my focus with deep breaths.',
	},
	{
		id: 3,
		title: 'Feeling Overwhelmed',
		body: 'Wrote down three small wins to steady my mind.',
	},
]

export default function Journal() {
	const navigate = useNavigate()
	const [entries, setEntries] = useState(initialEntries)
	const [searchTerm, setSearchTerm] = useState('')
	const [currentTitle, setCurrentTitle] = useState('')
	const [currentEntry, setCurrentEntry] = useState('')
	const [selectedId, setSelectedId] = useState(null)
	const [promptIndex, setPromptIndex] = useState(0)

	const filteredEntries = useMemo(() => {
		const term = searchTerm.trim().toLowerCase()
		if (!term) return entries
		return entries.filter(
			(entry) =>
				entry.title.toLowerCase().includes(term) ||
				entry.body.toLowerCase().includes(term),
		)
	}, [entries, searchTerm])

	const handleSave = () => {
		const trimmed = currentEntry.trim()
		if (!trimmed) return
		const trimmedTitle = currentTitle.trim()
		const derivedTitle = trimmed.split('\n')[0]?.slice(0, 48)
		const title = trimmedTitle || derivedTitle || 'New Entry'
		if (selectedId) {
			setEntries((current) =>
				current.map((entry) =>
					entry.id === selectedId
						? { ...entry, title, body: trimmed }
						: entry,
					),
			)
			return
		}
		setEntries((current) => [
			{ id: Date.now(), title, body: trimmed },
			...current,
		])
		setCurrentTitle('')
		setCurrentEntry('')
	}

	const handleDelete = () => {
		if (selectedId) {
			setEntries((current) =>
				current.filter((entry) => entry.id !== selectedId),
			)
			setSelectedId(null)
			setCurrentTitle('')
			setCurrentEntry('')
			return
		}
		setCurrentTitle('')
		setCurrentEntry('')
	}

	const handleSelectEntry = (entry) => {
		setSelectedId(entry.id)
		setCurrentTitle(entry.title)
		setCurrentEntry(entry.body)
	}

	return (
		<div className="relative min-h-screen">
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
			<div className="flex min-h-screen">
				<Sidebar
					onHome={() => navigate('/student-dashboard')}
					onProfile={() => navigate('/student-profile')}
					onLogout={() => navigate('/')}
					onContact={() => navigate('/contact-us')}
				/>
				<main className="flex flex-1 flex-col px-8 py-8">
					<div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
						<h1 className="text-3xl font-semibold uppercase tracking-[0.3em] text-[#0E1D2D]">
							Journal
						</h1>
						<div className="relative w-full">
							<input
								type="search"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								placeholder="Search past entries"
								className="w-full rounded-2xl border border-[#7C9885]/70 bg-[#FFF4DE] px-5 py-3 text-base text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]"
								aria-label="Search past journal entries"
							/>
						</div>
					</div>

					<div className="mt-8 grid flex-1 gap-6 lg:grid-cols-[1.4fr_0.8fr]">
						<section className="flex flex-col gap-5">
							<div className="rounded-3xl bg-[#BED4C5] p-5 text-base text-[#0E1D2D]">
								<div className="flex flex-wrap items-center justify-between gap-3">
									<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Journaling Prompt
									</p>
									<button
										type="button"
										onClick={() =>
											setPromptIndex((current) =>
												(current + 1) % promptOptions.length,
											)
										}
										className="rounded-full border border-[#204060] px-4 py-1 text-sm font-semibold text-[#204060] transition hover:bg-[#204060] hover:text-[#FFF4DE]"
									>
										New prompt
									</button>
								</div>
								<p className="mt-3 text-base text-[#0E1D2D]/80">
									{promptOptions[promptIndex]}
								</p>
							</div>

							<div className="flex flex-1 flex-col rounded-3xl bg-[#BED4C5] p-5">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Journal Entry
								</p>
								<div className="mt-3">
									<input
										type="text"
										value={currentTitle}
										onChange={(event) => setCurrentTitle(event.target.value)}
										placeholder="Add a title"
										className="w-full rounded-2xl border border-[#7C9885]/70 bg-[#FFF4DE] px-5 py-3 text-base text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]"
										aria-label="Journal entry title"
									/>
								</div>
								<textarea
									value={currentEntry}
									onChange={(event) => setCurrentEntry(event.target.value)}
									placeholder="Start writing your thoughts here..."
									className="mt-4 flex-1 resize-none rounded-2xl border border-[#7C9885]/70 bg-[#FFF4DE] px-5 py-4 text-base text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]"
									rows={10}
									aria-label="Journal entry"
								/>
							</div>
						</section>

						<aside className="flex flex-col gap-5">
							<div className="flex min-h-[360px] flex-1 flex-col rounded-3xl bg-[#FEDC97] p-5">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Past Journal History
								</p>
								<div className="mt-4 flex-1 space-y-3 overflow-auto pr-2 text-base scroll-shadow">
									{filteredEntries.length === 0 ? (
										<p className="text-sm text-[#0E1D2D]/60">
											No entries found.
										</p>
									) : (
										filteredEntries.map((entry) => (
											<button
												key={entry.id}
												type="button"
												onClick={() => handleSelectEntry(entry)}
												className={`w-full rounded-2xl border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6] ${
													selectedId === entry.id
														? 'border-[#28666E] bg-[#FFF4DE] text-[#0E1D2D]'
														: 'border-[#7C9885]/40 bg-[#FFF4DE]/70 text-[#0E1D2D]/80 hover:bg-[#FFF4DE]'
												}`}
											>
												<p className="text-base font-semibold text-[#204060]">
													{entry.title}
												</p>
												<p className="mt-1 line-clamp-2 text-sm text-[#0E1D2D]/70">
													{entry.body}
												</p>
											</button>
										))
									)}
								</div>
							</div>

							<div className="grid gap-4">
								<button
									type="button"
									onClick={handleDelete}
									className="rounded-2xl bg-[#204060] px-5 py-3 text-base font-semibold text-[#FFF4DE] shadow-[0_12px_20px_-16px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
								>
									Delete
								</button>
								<button
									type="button"
									onClick={handleSave}
									className="rounded-2xl bg-[#28666E] px-5 py-3 text-base font-semibold text-[#FFF4DE] shadow-[0_12px_20px_-16px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
								>
									Save
								</button>
							</div>
						</aside>
					</div>
				</main>
			</div>
		</div>
	)
}
