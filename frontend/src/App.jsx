import { Route, Routes } from 'react-router-dom'
import BreathingExercise from './pages/BreathingExercise'
import ContactUs from './pages/ContactUs'
import ContactUs2 from './pages/ContactUs2'
import DeveloperLogin from './pages/DeveloperLogin'
import DeveloperDashboard from './pages/DeveloperDashboard'
import DeveloperSignUp from './pages/DeveloperSignUp'
import GenerateQuiz from './pages/GenerateQuiz'
import Journal from './pages/Journal'
import PersonalStats from './pages/PersonalStats'
import PreviewQuiz from './pages/PreviewQuiz'
import QuizPage from './pages/QuizPage'
import RoleChoice from './pages/RoleChoice'
import StudentDashboard from './pages/StudentDashboard'
import StudentLogin from './pages/StudentLogin'
import StudentProfile from './pages/StudentProfile'
import StudentSignUp from './pages/StudentSignUp'
import UniversityDashboard from './pages/UniversityDashboard'
import UniversityLogin from './pages/UniversityLogin'
import UniversityProfile from './pages/UniversityProfile'
import UniversitySignUp from './pages/UniversitySignUp'
import UniversityStats from './pages/UniversityStats'
import Welcome from './pages/Welcome'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/breathing-exercises" element={<BreathingExercise />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/contact-us2" element={<ContactUs2 />} />
      <Route path="/role-choice" element={<RoleChoice />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-profile" element={<StudentProfile />} />
      <Route path="/student-signup" element={<StudentSignUp />} />
      <Route path="/university-login" element={<UniversityLogin />} />
      <Route path="/university-dashboard" element={<UniversityDashboard />} />
      <Route path="/university-profile" element={<UniversityProfile />} />
      <Route path="/university-stats" element={<UniversityStats />} />
      <Route path="/university-signup" element={<UniversitySignUp />} />
      <Route path="/developer-login" element={<DeveloperLogin />} />
      <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
      <Route path="/developer-signup" element={<DeveloperSignUp />} />
      <Route path="/generate-quiz" element={<GenerateQuiz />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/personal-stats" element={<PersonalStats />} />
      <Route path="/preview-quiz" element={<PreviewQuiz />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  )
}

export default App