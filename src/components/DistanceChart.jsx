import {
    ResponsiveContainer,
    LineChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine
} from "recharts";
import "../styles/dashboardStyles/distanceChart.css";

function CustomDot(props) {
    const {
        cx,
        cy,
        payload,
        currentWeek,
    } = props;

    const isCurrentWeek =
        payload.week === currentWeek;
    if (!isCurrentWeek) {
        return (
            <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="var(--pool-blue)"
                stroke="var(--turquoise)"
                strokeWidth={2}
            />
        );
    }
    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r={12}
                fill="rgba(51,214,200,.15)"
            />

            <circle
                className="current-week-dot"
                cx={cx}
                cy={cy}
                r={8}
                fill="var(--pool-blue)"
                stroke="var(--turquoise)"
                strokeWidth={3}
            />

            <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="#fff"
            />
            <text
                x={cx}
                y={cy - 18}
                textAnchor="middle"
                fill="var(--turquoise)"
                fontSize="12"
                fontWeight="700"
            >
                Current Week
            </text>
        </g>
    )
}

function DistanceChart({ workouts }) {
    const sortedWorkouts = [...workouts].sort(
        (a, b) =>
            (a.date?.seconds || 0) -
            (b.date?.seconds || 0)
    );

    const groupedData = {};

    sortedWorkouts.forEach((workout) => {
        if (!workout.date) return;

        const date = workout.date.toDate();
        const weekStart = new Date(date);
        const day = weekStart.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        weekStart.setDate(weekStart.getDate() + diff);
        weekStart.setHours(0, 0, 0, 0);
        const key = weekStart.toISOString().split("T")[0];

        if (!groupedData[key]) {
            groupedData[key] = {
                week: key,
                distance: 0,
            };
        }

        groupedData[key].distance +=
            Number(workout.distance) || 0;
    });

    const chartData = Object.values(groupedData).sort(
        (a, b) => new Date(a.week) - new Date(b.week)
    );

    const currentWeek = chartData[chartData.length - 1];
    const previousWeek = chartData[chartData.length - 2];
    const currentDistance = currentWeek?.distance || 0;
    const previousDistance = previousWeek?.distance || 0;

    const percentChange =
        previousDistance === 0
            ? 0
            : Math.round(
                ((currentDistance - previousDistance) /
                    previousDistance) * 100
            );
    const bestWeek =
        chartData.length > 0
            ? Math.max(...chartData.map((week) => week.distance))
            : 0;

    return (
        <div className="swim-card-glass dashboard-panel">
            <div className="dashboard-chart-header">
                <div>
                    <h2 className="dashboard-section-title">
                        Weekly Distance
                    </h2>

                    <p className="dashboard-section-subtitle">
                        Total yardage completed each week
                    </p>
                </div>

                <div className="dashboard-week-summary">
                    <div className="summary-item">
                        <span>This Week</span>
                        <strong>{currentDistance.toLocaleString()} yd</strong>
                    </div>

                    <div className="summary-item">
                        <span>vs Last Week</span>
                        <strong
                            className={
                                percentChange >= 0
                                    ? "positive-change"
                                    : "negative-change"
                            }
                        >
                            {percentChange >= 0 ? "+" : ""}
                            {percentChange}%
                        </strong>
                    </div>
                    <div className="summary-item">
                        <span>Best Week</span>
                        <strong>{bestWeek.toLocaleString()} yd</strong>
                    </div>
                </div>
            </div>

            <div className="dashboard-chart-divider"></div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <LineChart data={chartData}>
                    <defs>
                        <linearGradient
                            id="distanceGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--pool-blue)"
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--turquoise)"
                            />
                        </linearGradient>
                        <linearGradient
                            id="distanceArea"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--turquoise)"
                                stopOpacity={0.35}
                            />
                            <stop
                                offset="60%"
                                stopColor="var(--pool-blue)"
                                stopOpacity={0.15}
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--pool-blue)"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        stroke="rgba(255,255,255,.08)"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="week"
                        stroke="var(--silver)"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) =>
                            `Week of ${new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}`
                        }
                    />

                    <YAxis
                        stroke="var(--silver)"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) =>
                            value >= 1000
                                ? `${(value / 1000).toFixed(1)}k`
                                : value
                        }
                    />

                    <Tooltip
                        contentStyle={{
                            background: "rgba(16,26,42,.95)",
                            border: "1px solid rgba(255,255,255,.08)",
                            borderRadius: "16px",
                            color: "#fff",
                            backdropFilter: "blur(14px)",
                        }}
                        labelStyle={{
                            color: "var(--turquoise)",
                            fontWeight: 700,
                            marginBottom: 8,
                        }}
                        formatter={(value) => [`${Number(value).toLocaleString()} yd`, "Distance"]}
                        labelFormatter={(label) =>
                            `Week of ${new Date(label).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                            })}`
                        }
                    />
                    <Area
                        type="natural"
                        dataKey="distance"
                        stroke="none"
                        fill="url(#distanceArea)"
                        fillOpacity={1}
                        isAnimationActive
                        animationDuration={1200}
                    />
                    <Line
                        type="natural"
                        dataKey="distance"
                        stroke="url(#distanceGradient)"
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dot={
                            <CustomDot currentWeek={currentWeek?.week} />
                        }
                        activeDot={{
                            r: 8,
                            fill: "var(--turquoise)",
                            stroke: "#fff",
                            strokeWidth: 2,
                        }}
                        isAnimationActive
                        animationDuration={1200}
                        animationEasing="ease-out"
                    />
                    <ReferenceLine
                        y={bestWeek}
                        stroke="rgba(255, 255, 255, .18)"
                        strokeDasharray="5 5"
                        label={{
                            value: "Best Week",
                            position: "right",
                            fill: "#9db5c8",
                            fontSize: 12,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div >
    );
}

export default DistanceChart;