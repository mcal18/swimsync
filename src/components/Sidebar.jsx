import { NavLink } from "react-router-dom";
import { FiHome, FiActivity, FiTrendingUp, FiTarget, FiCalendar, FiSettings } from "react-icons/fi";
import '../styles/sidebar.css';

function Sidebar() {
    return (
        <aside className="swim-sidebar">
            <div className="sidebar-brand">
                <h2>SwimSync</h2>
                <span className="brand-tagline">Every stroke. Every split. Every breakthrough.</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                    <FiHome /> <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/workouts"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                    <FiActivity /> <span>Workouts</span>
                </NavLink>

                <NavLink
                    to="/performance"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                    <FiTrendingUp /> <span>Performance</span>
                </NavLink>

                <NavLink
                    to="/goals"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                    <FiTarget /> <span>Goals</span>
                </NavLink>

                <NavLink
                    to="/calendar"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                    <FiCalendar /> <span>Calendar</span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                    <FiSettings /> <span>Settings</span>
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;