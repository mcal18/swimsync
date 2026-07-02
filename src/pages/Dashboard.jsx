import '../styles/dashboard.css'

function Dashboard() {
    return (
        <div className="swim-page-content">
            <h1 className="swim-page-heading">Dashboard</h1>
            <p className="swim-page-subtitle">Analyze. Improve. Achieve.</p>

            <div className="swim-card-glass target-metric-card"> 
                <h3>Weekly Distance</h3>
                <p className="swim-metric-value tracking-distance">
                    23, 500 yd
                </p>
                <span className="goal-status-label">Goal: 30, 000 yd</span>
            </div>
        </div>
    );
}

export default Dashboard;