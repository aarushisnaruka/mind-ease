import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialUniversities = [
	{ id: 1, name: 'North Ridge University', students: 245 },
	{ id: 2, name: 'Sunrise Institute of Tech', students: 312 },
	{ id: 3, name: 'Riverdale College', students: 198 },
	{ id: 4, name: 'Summit Arts Academy', students: 156 },
	{ id: 5, name: 'Harborview University', students: 289 },
]

export default function DeveloperDashboard() {
	const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState('')
	const [universities, setUniversities] = useState(initialUniversities)
	const [selectedIds, setSelectedIds] = useState([])
	const [feedback, setFeedback] = useState('')

	const filteredUniversities = useMemo(() => {
		const term = searchTerm.trim().toLowerCase()
		if (!term) return universities
		return universities.filter((uni) =>
			uni.name.toLowerCase().includes(term),
		)
	}, [searchTerm, universities])

	const toggleSelection = (id) => {
		setSelectedIds((current) =>
			current.includes(id)
				? current.filter((item) => item !== id)
				: [...current, id],
		)
	}

	const areAllSelected =
		universities.length > 0 && selectedIds.length === universities.length

	const handleSelectAll = () => {
		if (areAllSelected) {
			// If all are currently selected, clear the selection
			setSelectedIds([])
		} else {
			// Otherwise, select all
			const allIds = universities.map((uni) => uni.id)
			setSelectedIds(allIds)
		}
	}

	const handleDeleteSelected = () => {
		if (selectedIds.length === 0) return
		setUniversities((current) =>
			current.filter((uni) => !selectedIds.includes(uni.id)),
		)
		setSelectedIds([])
	}

	const handleShare = () => {
		const selected = universities.filter((uni) =>
			selectedIds.includes(uni.id),
		)
		if (!feedback.trim() || selected.length === 0) return
		console.log('Sharing feedback', {
			message: feedback,
			universities: selected.map((uni) => uni.name),
		})
		setFeedback('')
	}

	return (
		<div className="relative min-h-screen">
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
			<div className="flex min-h-screen">
				<aside className="flex h-screen w-56 flex-col gap-6 bg-[#204060] px-6 py-8 text-[#FFF4DE]">
					<nav className="flex flex-col gap-2 text-sm font-medium">
						{['Home', 'Generate quiz', 'Log out'].map((item) => (
							<button
								key={item}
								type="button"
								onClick={() => {
									if (item === 'Generate quiz') {
										navigate('/generate-quiz')
										return
									}
									if (item === 'Log out') {
										navigate('/')
									}
								}}
								className="rounded-xl px-3 py-2 text-left transition hover:bg-[#0E1D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF4DE]"
							>
								{item}
							</button>
						))}
					</nav>
				</aside>
				{/* Constrain main height to screen to enable inner scrolling */}
				<main className="flex h-screen flex-1 flex-col px-6 py-6">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="relative w-full max-w-md">
							<input
								type="search"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								placeholder="Uni Search Bar"
								className="w-full rounded-2xl border border-[#7C9885]/70 bg-[#FEDC97] px-4 py-2 text-sm text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]"
								aria-label="University search"
							/>
						</div>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={handleSelectAll}
								className="rounded-2xl bg-[#6F9FA5] px-4 py-2 text-sm font-semibold text-[#FFF4DE] shadow-[0_10px_18px_-16px_rgba(14,29,45,0.7)]"
							>
								{areAllSelected ? 'Deselect all' : 'Select all'}
							</button>
							<button
								type="button"
								onClick={handleDeleteSelected}
								className="rounded-2xl bg-[#204060] px-4 py-2 text-sm font-semibold text-[#FFF4DE] shadow-[0_10px_18px_-16px_rgba(14,29,45,0.7)]"
							>
								Delete
							</button>
						</div>
					</div>

					{/* Changed to flex-col to manage vertical space */}
					<div className="mt-6 flex flex-1 flex-col gap-6 overflow-hidden">
						{/* List Section: flex-1 allows it to fill available space */}
						<section className="flex flex-1 flex-col min-h-0 rounded-3xl bg-[#BED4C5] p-5 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
							{/* Removed max-h, added flex-1 for scrolling */}
							<div className="flex-1 space-y-3 overflow-y-auto pr-2 text-sm scroll-shadow">
								{filteredUniversities.length === 0 ? (
									<p className="text-[#0E1D2D]/70">No universities found.</p>
								) : (
									filteredUniversities.map((uni) => (
										<button
											key={uni.id}
											type="button"
											onClick={() => toggleSelection(uni.id)}
											className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6] ${
												selectedIds.includes(uni.id)
													? 'border-[#28666E] bg-[#FFF4DE]'
													: 'border-[#7C9885]/40 bg-[#FFF4DE]/70 hover:bg-[#FFF4DE]'
											}`}
										>
											<div className="flex items-center gap-3">
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF4DE] text-xs font-semibold text-[#0E1D2D]">
													{uni.id}
												</div>
												<p className="text-sm font-semibold text-[#0E1D2D]">
													{uni.name}
												</p>
											</div>
											<div className="flex items-center gap-3">
												<p className="text-xs text-[#0E1D2D]/70">
													{uni.students} students
												</p>
												{selectedIds.includes(uni.id) ? (
													<div className="flex h-4 w-4 items-center justify-center rounded-sm border border-[#28666E] bg-[#6F9FA5]">
														<div className="h-2 w-2 rounded-sm bg-[#FFF4DE]" />
													</div>
												) : null}
											</div>
										</button>
									))
								)}
							</div>
						</section>

						<section className="rounded-3xl bg-[#FEDC97] p-5 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
							<p className="text-sm font-semibold text-[#0E1D2D]">
								Give suggestions to Uni
							</p>
							<textarea
								value={feedback}
								onChange={(event) => setFeedback(event.target.value)}
								placeholder="Share suggestions..."
								className="mt-3 h-24 w-full resize-none rounded-2xl border border-[#7C9885]/70 bg-[#FFF4DE] px-4 py-3 text-sm text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]"
								aria-label="Suggestions"
							/>
							<div className="mt-3 flex justify-end">
								<button
									type="button"
									onClick={handleShare}
									className="rounded-2xl bg-[#204060] px-4 py-2 text-sm font-semibold text-[#FFF4DE] shadow-[0_10px_18px_-16px_rgba(14,29,45,0.7)]"
								>
									Share
								</button>
							</div>
						</section>
					</div>
				</main>
			</div>
		</div>
	)
}