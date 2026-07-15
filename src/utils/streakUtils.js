export function calculateWorkoutStreks(workouts) {
    if (workouts.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            lastWorkout: null,
        };
    }

    const dates = [
        ...new Set(
            workouts
                .filter(w => w.date)
                .map(w =>
                    w.date
                        .toDate()
                        .toISOString()
                        .split("T")[0]
                )
        ),
    ]
        .sort()
        .map(date => new Date(date));
    let longest = 1;
    let current = 1;

    for (let i =1; i < dates.length; i++) {
        const diff =
            (dates[i] - dates[i - 1]) /
            (1000 * 60 * 60 * 24);
        
        if (diff === 1) {
            current++;
            longest = Math.max(longest, current);
        } else {
            current = 1;
        }
    }

    let activeStreak = 1;
    
    for (let i = dates.length -1; i > 0; i --) {
         const diff =
            (dates[i] - dates[i - 1]) /
            (1000 * 60 * 60 * 24);
        if (diff === 1) {
            activeStreak++;
        } else {
            break;
        }
    }

    return {
        currentStreak: activeStreak,
        longestStreak: longest,
        lastWorkout: dates[dates.length - 1],
    };
}