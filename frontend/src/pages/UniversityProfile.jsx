import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import ProfileForm from '../components/ProfileForm'
import Sidebar from '../components/Sidebar'

const initialValues = {
	uniId: 'Uni ID',
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

	const handleBranchChange = (index, value) => {
		setBranches((current) =>
			current.map((branch, branchIndex) =>
				branchIndex === index ? value : branch,
			),
		)
	}

	const handleAddBranch = () => {
		setBranches((current) => [...current, ''])
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
				<main className="flex flex-1 items-start justify-center px-6 py-8">
					<div className="w-full max-w-4xl space-y-6">
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
							onBranchChange={handleBranchChange}
							onAddBranch={handleAddBranch}
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
