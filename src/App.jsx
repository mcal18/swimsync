import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAuth } from './context/AuthContext';

import Sidebar from './components/Sidebar';
import BackgroundEffects from './components/BackgroundEffects';
import Login from './components/Login';

import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Settings from './pages/Settings';

import "./styles/responsive.css";

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="swim-app-layout">
        <Sidebar />
        <BackgroundEffects />

        <main className="swim-main-viewport">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;