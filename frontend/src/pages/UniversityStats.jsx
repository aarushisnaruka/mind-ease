import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const quizCounts = [
	{ month: 'Jan', quizzes: 120 },
	{ month: 'Feb', quizzes: 150 },
	{ month: 'Mar', quizzes: 180 },
	{ month: 'Apr', quizzes: 210 },
	{ month: 'May', quizzes: 190 },
]

export default function UniversityStats() {
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
				<main className="flex flex-1 flex-col px-6 py-6">
					<h1 className="text-2xl font-semibold text-[#0E1D2D]">
						Institute Stats
					</h1>

					<div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[1.4fr_0.7fr]">
						<section className="grid gap-6">
							<div className="rounded-3xl bg-[#BED4C5] p-5 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Graph
								</p>
								<div className="mt-4 h-60">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={quizCounts} margin={{ left: 16, right: 8, bottom: 18 }}>
											<CartesianGrid stroke="#A7D0D6" strokeDasharray="4 4" />
											<XAxis
												dataKey="month"
												stroke="#204060"
												tick={{ fill: '#0E1D2D', fontSize: 12 }}
												axisLine={{ stroke: '#204060' }}
												tickLine={{ stroke: '#204060' }}
												label={{
													value: 'Months',
													position: 'insideBottom',
													offset: -8,
													fill: '#0E1D2D',
													fontSize: 12,
												}}
											/>
											<YAxis
												stroke="#204060"
												tick={{ fill: '#0E1D2D', fontSize: 12 }}
												axisLine={{ stroke: '#204060' }}
												tickLine={{ stroke: '#204060' }}
												domain={[0, 260]}
												label={{
													value: 'Quiz Count',
													angle: -90,
													position: 'insideLeft',
													offset: -6,
													fill: '#0E1D2D',
													fontSize: 12,
												}}
											/>
											<Tooltip
												cursor={{ fill: '#A7D0D6' }}
												contentStyle={{
													backgroundColor: '#FFF4DE',
													border: '1px solid #7C9885',
													color: '#0E1D2D',
												}}
											/>
											<Bar dataKey="quizzes" fill="#6F9FA5" radius={[10, 10, 0, 0]} />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>

							<div className="rounded-3xl bg-[#BED4C5] p-5 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Suggestions
								</p>
								<div className="mt-3 space-y-2 text-sm text-[#0E1D2D]">
									<p>Provide on-campus counseling access</p>
									<p>Conduct regular mental-health workshops</p>
									<p>Introduce stress-free activity hours</p>
									<p>Offer anonymous support channels</p>
								</div>
							</div>
						</section>

						<aside className="grid gap-4">
							<div className="rounded-3xl bg-[#6F9FA5] p-5 text-[#FFF4DE] shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-xs font-semibold uppercase tracking-[0.2em]">
									Index
								</p>
								<div className="mt-2 space-y-1 text-sm text-[#FFF4DE]/80">
									<p>X-axis: Months</p>
									<p>Y-axis: Quizzes taken</p>
								</div>
							</div>
							<div className="rounded-3xl bg-[#FEDC97] p-5 text-[#0E1D2D] shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Number of Students Registered
								</p>
								<p className="mt-3 text-3xl font-semibold text-[#0E1D2D]">
									1,240
								</p>
							</div>
						</aside>
					</div>
				</main>
			</div>
		</div>
	)
}
