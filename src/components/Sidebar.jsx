import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiActivity, FiTrendingUp, FiTarget, FiCalendar, FiSettings } from 'react-icons/fi';
import logoImg from '../assets/swimsyncLogo.png';
import '../styles/Sidebar.css';

function Sidebar() {

  const { user, profile, logout } = useAuth();

  return (
    <aside className="swim-sidebar">
      
      <div className="sidebar-brand-container">
        
        <div className="sidebar-logo-box">
          <img src={logoImg} alt="SwimSync Logo" className="sidebar-logo-graphic" />
        </div>

        <div className="sidebar-brand-text">
          <h2 className="sidebar-brand-title">SwimSync</h2>
          <p className="brand-tagline">
            Every stroke. Every split.<br />Every breakthrough.
          </p>
        </div>
        
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiHome /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiActivity /> <span>Workouts</span>
        </NavLink>
        <NavLink to="/performance" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiTrendingUp /> <span>Performance</span>
        </NavLink>
        <NavLink to="/goals" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiTarget /> <span>Goals</span>
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiCalendar /> <span>Calendar</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiSettings /> <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-user-card">
        <h3>{profile?.name || "New Swimmer"}</h3>
        <small>{profile?.team || "No Team"}</small>
      </div>
    </aside>
  );
}

export default Sidebar;
