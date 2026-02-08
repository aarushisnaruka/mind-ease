import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const inputBase =
	'flex w-full rounded-xl border border-[#7C9885]/60 bg-[#FFF4DE] px-3 py-2 text-xs text-[#0E1D2D] placeholder:text-[#0E1D2D]/50 focus:outline-none focus:ring-2 focus:ring-[#A7D0D6]'

export default function ProfileForm({
	variant = 'student',
	values,
	isEditing,
	universities = [],
	branches = [],
	onChange,
	onBranchChange,
	onAddBranch,
	onEdit,
	onSave,
	onDelete,
}) {
	const [showPassword, setShowPassword] = useState(false)
	const isUniversity = variant === 'university'

	return (
		<div className="rounded-3xl bg-[#FEDC97] p-6">
			<div className="grid gap-4">
				{isUniversity ? (
					<>
						<div className="grid gap-3 sm:grid-cols-2">
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

						<div className="space-y-2">
							{branches.map((branch, index) => (
								<input
									key={`${index}-${branch}`}
									className={inputBase}
									placeholder={`Branch ${index + 1}`}
									value={branch}
									onChange={(event) =>
										onBranchChange?.(index, event.target.value)
									}
									readOnly={!isEditing}
									aria-label={`Branch ${index + 1}`}
								/>
							))}
							{isEditing ? (
								<button
									type="button"
									onClick={onAddBranch}
									className="inline-flex items-center justify-center rounded-full bg-[#6F9FA5] px-4 py-2 text-xs font-semibold text-[#0E1D2D] shadow-[0_10px_18px_-12px_rgba(14,29,45,0.6)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
								>
									+ Add Branch
								</button>
							) : null}
						</div>

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
									className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#204060] hover:text-[#28666E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
									aria-label="Toggle password visibility"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="grid gap-3 sm:grid-cols-2">
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

						<div className="grid gap-3 sm:grid-cols-2">
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
									className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#204060] hover:text-[#28666E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
									aria-label="Toggle password visibility"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>
					</>
				)}
			</div>

			<div className="mt-6 flex flex-wrap gap-3">
				<button
					type="button"
					onClick={onEdit}
					className="rounded-full bg-[#28666E] px-5 py-2 text-xs font-semibold text-[#FFF4DE] shadow-[0_10px_18px_-12px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
				>
					Edit
				</button>
				<button
					type="button"
					onClick={onSave}
					disabled={!isEditing}
					className={`rounded-full px-5 py-2 text-xs font-semibold shadow-[0_10px_18px_-12px_rgba(14,29,45,0.7)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6] ${
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
					className="rounded-full bg-[#0E1D2D] px-5 py-2 text-xs font-semibold text-[#FFF4DE] shadow-[0_10px_18px_-12px_rgba(14,29,45,0.7)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7D0D6]"
				>
					Delete
				</button>
			</div>
		</div>
	)
}
