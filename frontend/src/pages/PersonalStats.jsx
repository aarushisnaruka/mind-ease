import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const weeklyMood = [
	{ day: 'Mon', mood: 6 },
	{ day: 'Tue', mood: 5 },
	{ day: 'Wed', mood: 7 },
	{ day: 'Thu', mood: 4 },
	{ day: 'Fri', mood: 8 },
	{ day: 'Sat', mood: 7 },
	{ day: 'Sun', mood: 6 },
]

const quizScores = [
	{ month: 'Jan', score: 62 },
	{ month: 'Feb', score: 68 },
	{ month: 'Mar', score: 72 },
	{ month: 'Apr', score: 74 },
	{ month: 'May', score: 78 },
]

const moodDistribution = [
	{ name: 'Calm', value: 35 },
	{ name: 'Focused', value: 25 },
	{ name: 'Anxious', value: 20 },
	{ name: 'Tired', value: 20 },
]

const palette = ['#28666E', '#6F9FA5', '#7C9885', '#BED4C5']

export default function PersonalStats() {
	const navigate = useNavigate()
	const moodIndex = Math.round(
		(weeklyMood.reduce((sum, item) => sum + item.mood, 0) /
			weeklyMood.length) *
			10,
	)
	const quizIndex = Math.round(
		quizScores.reduce((sum, item) => sum + item.score, 0) /
			quizScores.length,
	)

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
					<h1 className="text-2xl font-semibold text-[#0E1D2D]">
						Personal Stats
					</h1>

					<div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[1.5fr_0.7fr]">
						<section className="grid gap-6">
							<div className="rounded-3xl bg-[#BED4C5] p-5 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Mood Graph
								</p>
								<div className="mt-4 h-56">
									<ResponsiveContainer width="100%" height="100%">
										<LineChart data={weeklyMood} margin={{ left: 16, right: 8, bottom: 18 }}>
											<CartesianGrid stroke="#A7D0D6" strokeDasharray="4 4" />
											<XAxis
												dataKey="day"
												stroke="#204060"
												tick={{ fill: '#0E1D2D', fontSize: 12 }}
												axisLine={{ stroke: '#204060' }}
												tickLine={{ stroke: '#204060' }}
												label={{
													value: 'Day',
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
												domain={[0, 10]}
												label={{
													value: 'Mood Score',
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
											<Legend
												verticalAlign="top"
												align="right"
												wrapperStyle={{ color: '#0E1D2D', fontSize: 12 }}
											/>
											<Line
												type="monotone"
												dataKey="mood"
												stroke="#28666E"
												strokeWidth={3}
												dot={{ fill: '#204060', stroke: '#204060' }}
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>

							<div className="rounded-3xl bg-[#BED4C5] p-5 shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Quiz Graph
								</p>
								<div className="mt-4 h-56">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={quizScores} margin={{ left: 16, right: 8, bottom: 18 }}>
											<CartesianGrid stroke="#A7D0D6" strokeDasharray="4 4" />
											<XAxis
												dataKey="month"
												stroke="#204060"
												tick={{ fill: '#0E1D2D', fontSize: 12 }}
												axisLine={{ stroke: '#204060' }}
												tickLine={{ stroke: '#204060' }}
												label={{
													value: 'Month',
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
												domain={[0, 100]}
												label={{
													value: 'Score',
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
											<Legend
												verticalAlign="top"
												align="right"
												wrapperStyle={{ color: '#0E1D2D', fontSize: 12 }}
											/>
											<Bar dataKey="score" fill="#6F9FA5" radius={[10, 10, 0, 0]} />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						</section>

						<aside className="grid gap-4">
							<div className="rounded-3xl bg-[#6F9FA5] p-5 text-[#FFF4DE] shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.2em]">
											Mood Index
										</p>
										<p className="mt-1 text-xs text-[#FFF4DE]/80">
											Weekly average score
										</p>
									</div>
									<span className="text-3xl font-semibold">{moodIndex}%</span>
								</div>
							</div>

							<div className="rounded-3xl bg-[#FEDC97] p-4 text-[#0E1D2D] shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#204060]">
									Pie Chart
								</p>
								<div className="mt-4 h-44">
									<ResponsiveContainer width="100%" height="100%">
										<PieChart>
											<Pie
												data={moodDistribution}
												dataKey="value"
												nameKey="name"
												innerRadius={45}
												outerRadius={70}
												paddingAngle={2}
												stroke="#FFF4DE"
											>
												{moodDistribution.map((item, index) => (
													<Cell key={item.name} fill={palette[index % palette.length]} />
												))}
											</Pie>
											<Tooltip
												cursor={{ fill: '#A7D0D6' }}
												contentStyle={{
													backgroundColor: '#FFF4DE',
													border: '1px solid #7C9885',
													color: '#0E1D2D',
												}}
											/>
										</PieChart>
									</ResponsiveContainer>
								</div>
								<div className="mt-3 grid gap-2 text-xs">
									{moodDistribution.map((item) => (
										<div key={item.name} className="flex items-center justify-between">
											<span>{item.name}</span>
											<span className="font-semibold text-[#204060]">
												{item.value}%
											</span>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-3xl bg-[#7C9885] p-5 text-[#FFF4DE] shadow-[0_14px_26px_-20px_rgba(14,29,45,0.7)]">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.2em]">
											Quiz Index
										</p>
										<p className="mt-1 text-xs text-[#FFF4DE]/80">
											Monthly average score
										</p>
									</div>
									<span className="text-3xl font-semibold">{quizIndex}</span>
								</div>
							</div>
						</aside>
					</div>
				</main>
			</div>
		</div>
	)
}
