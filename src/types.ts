export interface Metric {
    id: string;
    displayName: string;
    isPercentageMetric: boolean;
}

export interface Segment {
    segmentKey: string;
    displayName: string;
    values: Array<{ segmentId: string; displayName: string }>;
}

export interface SnapshotData {
    metric: string;
    segmentKey: string;
    segmentId: string;
    values: Array<{ date: string; value: number }>;
}

export interface KPIResult {
    snapshot: SnapshotData,
    changeType: 'gain' | 'loss' | 'no change' | null;
    currentValue: string;
    gainsOrLossesPercentage: string | null;
}
