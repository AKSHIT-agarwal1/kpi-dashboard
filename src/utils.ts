
// Utility function to format numbers
import { KPIResult, SnapshotData } from './types';
function formatValue(value: number): string {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
    } else {
        return value.toString();
    }
}

// Utility function to format percentage with one decimal place
function formatPercentage(percentage: number): string {
    return percentage.toFixed(1) + '%';
}

export function extractKPI(data: SnapshotData): KPIResult {
    // Helper function to parse dates and sort in descending order
    const parseDate = (dateStr: string) => new Date(dateStr).getTime();

    // Sort the values array by date in descending order
    data.values.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    // Get the current value (value from the most recent date)
    const currentValue = data.values[0]?.value ?? 0;

    // Initialize variables for the last 7 days' values
    let previousValue: number | null = null;
    let gainsOrLossesPercentage: number | null = null;
    let changeType: 'gain' | 'loss' | 'no change' | null = null;
    if (data.values.length > 1) {
        // Get the values from the last 7 days
        const last7DaysValues = data.values.slice(0, 7);
        previousValue = last7DaysValues[last7DaysValues.length - 1]?.value ?? null;

        // Calculate the percentage gains or losses
        if (previousValue !== null && previousValue !== 0) {
            gainsOrLossesPercentage = ((currentValue - previousValue) / previousValue) * 100;
            if (gainsOrLossesPercentage > 0) {
                changeType = 'gain';
            } else if (gainsOrLossesPercentage < 0) {
                changeType = 'loss';
            } else {
                changeType = 'no change';
            }
        } else {
            gainsOrLossesPercentage = currentValue !== 0 ? Infinity : null;
            changeType = currentValue !== 0 ? 'gain' : null; // Special case: if previousValue is 0 but currentValue is not, it is considered a gain
        }
    }
    return {
        snapshot: { ...data, values: data.values.reverse() },
        currentValue: formatValue(currentValue),
        changeType,
        gainsOrLossesPercentage: gainsOrLossesPercentage !== null ? formatPercentage(gainsOrLossesPercentage) : null
    };
}

export const getChangeIcon = (result: KPIResult | null) => {
    switch (result?.changeType) {
        case 'gain':
            return '▲'; // Up arrow icon
        case 'loss':
            return '▼'; // Down arrow icon
        case 'no change':
            return '—'; // Dash icon
        default:
            return null;
    }
};


export const getChartColor = (result: KPIResult | null) => {
    switch (result?.changeType) {
        case 'gain':
            return '#119F97'; // Green for gain
        case 'loss':
            return '#FF5D39'; // Red for loss
        case 'no change':
            return '#000000CC'; // Gray for no change
        default:
            return '#000000CC'; // Default color
    }
};

