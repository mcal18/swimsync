import "../styles/skeleton.css";

function SkeletonCard({ type = "chart" }) {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            {type === "stats" && (
                <div className="skeleton-stats"></div>
            )}
            {type === "records" && (
                <div className="skeleton-records"></div>
            )}
            {type === "chart" && (
                <div className="skeleton-chart"></div>
            )}
        </div>
    );
}

export default SkeletonCard;