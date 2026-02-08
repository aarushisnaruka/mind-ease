import { Route, Routes } from 'react-router-dom'
import DeveloperLogin from './pages/DeveloperLogin'
import DeveloperSignUp from './pages/DeveloperSignUp'
import RoleChoice from './pages/RoleChoice'
import StudentDashboard from './pages/StudentDashboard'
import StudentLogin from './pages/StudentLogin'
import StudentSignUp from './pages/StudentSignUp'
import UniversityDashboard from './pages/UniversityDashboard'
import UniversityLogin from './pages/UniversityLogin'
import UniversitySignUp from './pages/UniversitySignUp'
import Welcome from './pages/Welcome'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/role-choice" element={<RoleChoice />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-signup" element={<StudentSignUp />} />
      <Route path="/university-login" element={<UniversityLogin />} />
      <Route path="/university-dashboard" element={<UniversityDashboard />} />
      <Route path="/university-signup" element={<UniversitySignUp />} />
      <Route path="/developer-login" element={<DeveloperLogin />} />
      <Route path="/developer-signup" element={<DeveloperSignUp />} />
    </Routes>
  )
}

export default App