import '../styles/backgroundEffects.css';

export default function BackgroundEffects() {

    return (
        <div className="bubble-container">
            {Array.from({ length: 18 }).map((_, index) => (
                <span
                    key={index}
                    className="bubble"
                />
            ))}
        </div>
    );
}