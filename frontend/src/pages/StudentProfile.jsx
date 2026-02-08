import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import ProfileForm from '../components/ProfileForm'
import Sidebar from '../components/Sidebar'

const universities = [
	'North Campus University',
	'Sunrise Institute of Tech',
	'Riverdale College',
]

const branches = ['Computer Science', 'Psychology', 'Design', 'Business']

const initialValues = {
	name: 'XYZ',
	age: '20',
	registrationNo: 'REG-2024-118',
	universityName: universities[0],
	branch: branches[0],
	email: 'abcdeghij@gmail.com',
	password: 'password123',
}

export default function StudentProfile() {
	const navigate = useNavigate()
	const [isEditing, setIsEditing] = useState(false)
	const [values, setValues] = useState(initialValues)

	const handleChange = (event) => {
		const { name, value } = event.target
		setValues((current) => ({ ...current, [name]: value }))
	}

	const handleSave = () => {
		setIsEditing(false)
	}

	const handleDelete = () => {
		setValues(initialValues)
		setIsEditing(false)
	}

	return (
		<div className="min-h-screen bg-[#FFF4DE]">
			<div className="flex min-h-screen">
				<Sidebar
					onHome={() => navigate('/student-dashboard')}
					onLogout={() => navigate('/')}
					onContact={() => navigate('/contact-us')}
				/>
				<main className="flex flex-1 items-start justify-center px-6 py-8">
					<div className="w-full max-w-3xl space-y-6">
						<ProfileHeader
							variant="student"
							name={values.name}
							email={values.email}
						/>
						<ProfileForm
							variant="student"
							values={values}
							isEditing={isEditing}
							universities={universities}
							branches={branches}
							onChange={handleChange}
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
