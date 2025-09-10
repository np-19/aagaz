import { Routes, Route } from 'react-router-dom';
import "./App.css"
import MainLayout from './components/layout/MainLayout';
import Landing from './components/sections/Landing';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import Dashboard from './components/sections/Dashboard';
import Quiz from './components/sections/Quiz';
import Colleges from './components/sections/Colleges';
import CareerPaths from './components/sections/CareerPaths';
import Timeline from './components/sections/Timeline';
import Recommendations from './components/sections/Recommendations';
import Resources from './components/sections/Resources';
import Settings from './components/sections/Settings';
import './styles/globals.css';

function App() {
  return (
    <Routes>
      {/* Standalone pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/testimonials" element={<Testimonials />} />

      {/* Pages with main layout (Navbar and Sidebar) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/career-paths" element={<CareerPaths />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
