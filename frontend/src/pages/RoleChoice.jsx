import { useNavigate } from 'react-router-dom'

function LoginOptionCard({ title, iconSrc, onSelect }) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className="group flex w-full flex-col items-center justify-center rounded-3xl border-4 border-[#204060]/90 bg-[#FEDC97]/20 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#204060] md:p-10"
		>
			<div className="mb-6 flex h-20 w-20 items-center justify-center">
				<img
					src={iconSrc}
					alt={title}
					className="h-full w-full object-contain"
				/>
			</div>
			<h2 className="whitespace-pre-line text-center text-2xl font-bold text-[#204060] md:text-3xl">
				{title}
			</h2>
		</button>
	)
}

export default function RoleChoice() {
	const navigate = useNavigate()
	
	const options = [
		{
			title: 'STUDENT\nLOGIN',
			iconSrc: '/RoleChoiceImg/student_icon.png',
			onSelect: () => navigate('/student-login'),
		},
		{
			title: 'UNIVERSITY\nLOGIN',
			iconSrc: '/RoleChoiceImg/uni_icon.png',
			onSelect: () => navigate('/university-login'),
		},
		{
			title: 'DEVELOPER\nLOGIN',
			iconSrc: '/RoleChoiceImg/dev_icon.png',
			onSelect: () => navigate('/developer-login'),
		},
	]

	return (
		<main className="relative min-h-screen overflow-hidden">
			{/* Fixed background image */}
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			
			{/* Subtle overlay for better readability */}
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />

			<div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
				{/* Header */}
				<div className="mb-16 w-full rounded-3xl bg-[#204060] px-8 py-6 text-center shadow-xl">
					<h1 className="text-4xl font-bold uppercase tracking-wide text-white md:text-4xl">
						Choose your Role!
					</h1>
				</div>

				{/* Asymmetric Cards Layout - Triangle/Pyramid arrangement */}
				<div className="relative w-full max-w-6xl">
					{/* Desktop: 3-column grid with asymmetric placement | Mobile: vertical stack */}
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-x-12 md:gap-y-8">
						{/* Student - Left (col 1, row 1) */}
						<div className="md:col-start-1 md:row-start-1">
							<LoginOptionCard
								title={options[0].title}
								iconSrc={options[0].iconSrc}
								onSelect={options[0].onSelect}
							/>
						</div>

						{/* University - Right (col 3, row 1) */}
						<div className="md:col-start-3 md:row-start-1">
							<LoginOptionCard
								title={options[1].title}
								iconSrc={options[1].iconSrc}
								onSelect={options[1].onSelect}
							/>
						</div>

						{/* Developer - Center Bottom (col 2, row 2) - creates triangle */}
						<div className="md:col-start-2 md:row-start-2">
							<LoginOptionCard
								title={options[2].title}
								iconSrc={options[2].iconSrc}
								onSelect={options[2].onSelect}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
