import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import ProfileForm from '../components/ProfileForm'
import Sidebar from '../components/Sidebar'

const initialValues = {
	uniId: 'ME1003',
	universityName: 'XYZ',
	cityState: 'City, State',
	email: 'abcdeghij@gmail.com',
	password: 'password123',
}

const initialBranches = ['Computer Science', 'Psychology', 'Design']

export default function UniversityProfile() {
	const navigate = useNavigate()
	const [isEditing, setIsEditing] = useState(false)
	const [values, setValues] = useState(initialValues)
	const [branches, setBranches] = useState(initialBranches)

	const handleChange = (event) => {
		const { name, value } = event.target
		setValues((current) => ({ ...current, [name]: value }))
	}

	const handleAddBranch = (branchName) => {
		const trimmed = branchName.trim()
		if (!trimmed) return
		setBranches((current) => [...current, trimmed])
	}

	const handleDeleteBranch = (index) => {
		setBranches((current) =>
			current.filter((_, branchIndex) => branchIndex !== index),
		)
	}

	const handleSave = () => {
		setIsEditing(false)
	}

	const handleDelete = () => {
		setValues(initialValues)
		setBranches(initialBranches)
		setIsEditing(false)
	}

	return (
		<div className="relative min-h-screen">
			<div className="fixed inset-0 -z-10 bg-[url('/RoleChoiceImg/role_choice_bg.png')] bg-cover bg-center bg-no-repeat" />
			<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
			<div className="flex min-h-screen">
				<Sidebar
					onHome={() => navigate('/university-dashboard')}
					onLogout={() => navigate('/')}
					onContact={() => navigate('/contact-us2')}
				/>
				<main className="flex flex-1 items-start justify-center px-8 py-10">
					<div className="w-full max-w-5xl space-y-8">
						<ProfileHeader
							variant="university"
							uniId={values.uniId}
							name={values.universityName}
							email={values.email}
						/>
						<ProfileForm
							variant="university"
							values={values}
							branches={branches}
							isEditing={isEditing}
							onChange={handleChange}
							onAddBranch={handleAddBranch}
							onDeleteBranch={handleDeleteBranch}
							onEdit={() => setIsEditing(true)}
							onSave={handleSave}
							onDelete={handleDelete}
						/>
					</div>
				</main>
			</div>
		</div>
	)
}
