import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Landing from './components/sections/Landing';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import Dashboard from './components/sections/Dashboard';
import Quiz from './components/sections/Quiz';
import CollegesNew from './components/sections/CollegesNew';
import CareerPathsNew from './components/sections/CareerPathsNew';
import Timeline from './components/sections/Timeline';
import RecommendationsNew from './components/sections/RecommendationsNew';
import Resources from './components/sections/Resources';
import Settings from './components/sections/Settings';
import SignInPage from './components/auth/SignIn';
import SignUpPage from './components/auth/SignUp';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './styles/globals.css';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/testimonials" element={<Testimonials />} />
      
      {/* Authentication pages */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      {/* Protected pages with main layout (Navbar and Sidebar) */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/colleges" element={<CollegesNew />} />
        <Route path="/career-paths" element={<CareerPathsNew />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/recommendations" element={<RecommendationsNew />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
