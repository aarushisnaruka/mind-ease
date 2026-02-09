import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const inputBase =
	'flex w-full rounded-2xl border border-[#7C9885]/60 bg-[#FFF4DE] px-5 py-4 text-lg text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]'

export default function ProfileForm({
	variant = 'student',
	values,
	isEditing,
	universities = [],
	branches = [],
	onChange,
	onAddBranch,
	onDeleteBranch,
	onEdit,
	onSave,
	onDelete,
}) {
	const [showPassword, setShowPassword] = useState(false)
	const [newBranch, setNewBranch] = useState('')
	const isUniversity = variant === 'university'

	const handleAddBranch = () => {
		const trimmed = newBranch.trim()
		if (!trimmed) return
		onAddBranch?.(trimmed)
		setNewBranch('')
	}

	return (
		<div className="rounded-3xl bg-[#FEDC97] p-10">
			<div className="grid gap-6">
				{isUniversity ? (
					<>
						<div className="grid gap-4 sm:grid-cols-2">
							<input
								className={inputBase}
								name="universityName"
								placeholder="University name"
								value={values.universityName}
								onChange={onChange}
								readOnly={!isEditing}
								aria-label="University name"
							/>
							<input
								className={inputBase}
								name="cityState"
								placeholder="City, State"
								value={values.cityState}
								onChange={onChange}
								readOnly={!isEditing}
								aria-label="City and state"
							/>
						</div>

						<details className="rounded-2xl bg-[#FFF4DE] p-5">
							<summary className="cursor-pointer text-base font-semibold text-[#204060]">
								Branches
							</summary>
							<div className="mt-3 space-y-2">
								{branches.length ? (
									branches.map((branch, index) => (
										<div
											key={`${index}-${branch}`}
											className="flex items-center justify-between rounded-xl border border-[#7C9885]/50 bg-white/70 px-5 py-3 text-lg text-[#0E1D2D]"
										>
											<span>{branch}</span>
											{isEditing ? (
												<button
													type="button"
													onClick={() => onDeleteBranch?.(index)}
													className="rounded-full border border-[#C44536] px-4 py-1.5 text-sm font-semibold text-[#C44536] transition hover:bg-[#C44536] hover:text-white"
												>
													Delete
												</button>
											) : null}
										</div>
									))
								) : (
									<p className="text-base text-[#0E1D2D]/70">No branches yet.</p>
								)}
							</div>
							{isEditing ? (
								<div className="mt-4 flex items-center gap-3">
									<input
										className={inputBase}
										placeholder="Add branch"
										value={newBranch}
										onChange={(event) => setNewBranch(event.target.value)}
										aria-label="Add branch"
									/>
									<button
										type="button"
										onClick={handleAddBranch}
										className="inline-flex items-center justify-center rounded-full bg-[#6F9FA5] px-6 py-3.5 text-base font-semibold text-[#0E1D2D] shadow-[0_10px_18px_-12px_rgba(14,29,45,0.6)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
									>
										Add
									</button>
								</div>
							) : null}
						</details>

						<div className="grid gap-4 sm:grid-cols-2">
							<input
								className={inputBase}
								name="email"
								type="email"
								placeholder="Email"
								value={values.email}
								onChange={onChange}
								readOnly={!isEditing}
								aria-label="Email"
							/>
							<div className="relative">
								<input
									className={`${inputBase} pr-10`}
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Password"
									value={values.password}
									onChange={onChange}
									readOnly={!isEditing}
									aria-label="Password"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#204060] hover:text-[#28666E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
									aria-label="Toggle password visibility"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="grid gap-4 sm:grid-cols-2">
							<input
								className={inputBase}
								name="name"
								placeholder="Name"
								value={values.name}
								onChange={onChange}
								readOnly={!isEditing}
								aria-label="Name"
							/>
							<input
								className={inputBase}
								name="age"
								type="number"
								placeholder="Age"
								value={values.age}
								onChange={onChange}
								readOnly={!isEditing}
								aria-label="Age"
							/>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<input
								className={inputBase}
								name="registrationNo"
								placeholder="Registration no."
								value={values.registrationNo}
								onChange={onChange}
								readOnly={!isEditing}
								aria-label="Registration number"
							/>
							{isEditing ? (
								<select
									className={inputBase}
									name="universityName"
									value={values.universityName}
									onChange={onChange}
									aria-label="University name"
								>
									{universities.map((university) => (
										<option key={university} value={university}>
											{university}
										</option>
									))}
								</select>
							) : (
								<input
									className={inputBase}
									name="universityName"
									placeholder="Uni name"
									value={values.universityName}
									readOnly
									aria-label="University name"
								/>
							)}
						</div>

						{isEditing ? (
							<select
								className={inputBase}
								name="branch"
								value={values.branch}
								onChange={onChange}
								aria-label="Branch"
							>
								{branches.map((branch) => (
									<option key={branch} value={branch}>
										{branch}
									</option>
								))}
							</select>
						) : (
							<input
								className={inputBase}
								name="branch"
								placeholder="Branch"
								value={values.branch}
								readOnly
								aria-label="Branch"
							/>
						)}

						<div className="grid gap-3 sm:grid-cols-2">
							<input
								className={inputBase}
								name="email"
								type="email"
								placeholder="Email"
								value={values.email}
								onChange={onChange}
								readOnly={!isEditing}
								aria-label="Email"
							/>
							<div className="relative">
								<input
									className={`${inputBase} pr-10`}
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Password"
									value={values.password}
									onChange={onChange}
									readOnly={!isEditing}
									aria-label="Password"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#204060] hover:text-[#28666E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
									aria-label="Toggle password visibility"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
					</>
				)}
			</div>

			<div className="mt-10 flex flex-wrap gap-4">
				<button
					type="button"
					onClick={onEdit}
					className="rounded-full bg-[#28666E] px-7 py-3.5 text-base font-semibold text-[#FFF4DE] shadow-[0_10px_18px_-12px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
				>
					Edit
				</button>
				<button
					type="button"
					onClick={onSave}
					disabled={!isEditing}
					className={`rounded-full px-7 py-3.5 text-base font-semibold shadow-[0_10px_18px_-12px_rgba(14,29,45,0.7)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6] ${
						isEditing
							? 'bg-[#204060] text-[#FFF4DE] hover:opacity-90'
							: 'cursor-not-allowed bg-[#7C9885]/40 text-[#0E1D2D]/40'
					}`}
				>
					Save
				</button>
				<button
					type="button"
					onClick={onDelete}
					className="rounded-full bg-[#0E1D2D] px-7 py-3.5 text-base font-semibold text-[#FFF4DE] shadow-[0_10px_18px_-12px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
				>
					Delete
				</button>
			</div>
		</div>
	)
}
