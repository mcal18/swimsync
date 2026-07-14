import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
import "../styles/dashboardStyles/workoutFocusChart.css";

function WorkoutsFocusChart({ workouts }) {
    const focusTotals = {};

    workouts.forEach((workout) => {
        if (!workout.focus) return;

        focusTotals[workout.focus] =
            (focusTotals[workout.focus] || 0) + 1;
    });
    const chartData = Object.entries(focusTotals).map(
        ([name, value]) => ({
            name,
            value,
        })
    );
    const COLORS = {
        Technique: "#58b8ff",
        Sprint: "#33d6c8",
        Endurance: "#6fa8ff",
        Kick: "#63e6be",
        Pull: "#8b9dff",
        Drills: "#5fd4ff",
        Recovery: "#88f0d8",
        "Race Pace": "#00d4ff",
    };

    if (chartData.length === 0) {
        return (
            <div className="swim-card-glass">
                <h2 className="dashboard-section-title">
                    Workout Focus
                </h2>
                <p className="dashboard-section-subtitle">
                    Distribution of your logged workout focuses.
                </p>
                <div className="dashboard-empty-chart">
                    Log your first workout to see your focus distribution.
                </div>
            </div>
        );
    }

    return (
        <div className="swim-card-glass dashboard-panel">
            <div className="dashboard-chart-header">
                <div>
                    <h2 className="dashboard-section-title">
                        Workout Focus
                    </h2>

                    <p className="dashboard-section-subtitle">
                        Distribution of your logged workout focuses.
                    </p>
                </div>
            </div>


            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <PieChart>
                    <text
                        x="50%"
                        y={145}
                        textAnchor="middle"
                        fill="white"
                        fontSize="28"
                        fontWeight="700"

                    >
                        {workouts.length}
                    </text>
                    <text
                        x="50%"
                        y={168}
                        textAnchor="middle"
                        fill="#9db5c8"
                        fontSize="13"
                    >
                        Workouts
                    </text>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={72}
                        outerRadius={95}
                        paddingAngle={3}
                        isAnimationActive
                        animationDuration={900}
                        animationBegin={200}
                    >
                        {chartData.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={
                                    COLORS[entry.name] || "#58b8ff"
                                }
                                stroke="rgba(255,255,255,.18)"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: "rgba(16,26,42,.95)",
                            border: "1px solid rgba(255,255,255,.08)",
                            borderRadius: "16px",
                            backdropFilter: "blur(14px)",
                            color: "#fff"
                        }}
                        labelStyle={{
                            color: "var(--turquoise)",
                            fontWeight: 700,
                        }}
                        formatter={(value) => {
                            const count = Number(value);

                            return [
                                `${count} workout${count === 1 ? "" : "s"}`,
                                "Sessions",
                            ];
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={12}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WorkoutsFocusChart;