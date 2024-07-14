import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { ColorRing } from 'react-loader-spinner';

import ChartSection from '../ChartSection';
import Select from '../Select';

import { Metric, Segment, KPIResult } from '../../types';
import { getSnapshot } from '../../apis';
import { getChangeIcon, getChartColor } from '../../utils';



interface KpiCardProps {
    id: string;
    metrics: Metric[];
    segments: Segment[];
    onAddCard: (id: string) => void;
    onSave: (metric: Metric, segmentKey: string, segmentId: string) => void;
    onCancel: (metric: Metric, segmentKey: string, segmentId: string) => void;
    cardDetails: { id: string, metric: Metric; segmentKey: string; segmentId: string }
}


const KpiCard: React.FC<KpiCardProps> = ({ id, cardDetails, metrics, segments, onAddCard, onSave }) => {
    const [editMode, setEditMode] = useState(true);
    const [snapshotData, setSnapshotData] = useState<KPIResult | null>(null);
    const [selectedMetric, setSelectedMetric] = useState<Metric>(metrics[0]);
    const [selectedSegmentKey, setSelectedSegmentKey] = useState<string>(segments[0].segmentKey);
    const [selectedSegmentId, setSelectedSegmentId] = useState<string>(segments[0].values[0].segmentId);

    useEffect(() => {
        let isCancelled = false;
        if (!editMode) {
            const fetchSnapshot = async () => {
                const data = await getSnapshot(selectedMetric.id, selectedSegmentKey, selectedSegmentId);
                if (isCancelled) return;
                if (data === null) {
                    setEditMode(true);
                    alert('Something Went Wrong')
                }
                setSnapshotData(data !== null ? data : null);
            };
            fetchSnapshot();
        }
        return () => {
            isCancelled = true;
        };
    }, [editMode, selectedMetric, selectedSegmentKey, selectedSegmentId]);

    const handleSave = () => {
        onSave(selectedMetric, selectedSegmentKey, selectedSegmentId);
        setEditMode(false);
    };
    const chartColor = getChartColor(snapshotData);
    const changeIcon = getChangeIcon(snapshotData);

    if (!(snapshotData || editMode)) return (<ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{ position: 'absolute', top: '30%', left: '45%' }}
        wrapperClass="color-ring-wrapper"
        colors={["#119F97", "#119F97", "#119F97", "#119F97", "#119F97"]}
    />);

    return (
        <div className='flex flex-col flex-grow items-center'>
            {editMode ? (
                <div className='max-w-56'>
                    <div className='flex flex-col gap-1'>
                        <Select
                            value={selectedMetric.id}
                            onChange={(e) => setSelectedMetric(metrics.find(metric => metric.id === e.target.value)!)}                        >
                            {metrics.map((metric) => (
                                <option key={metric.id} value={metric.id}>{metric.displayName}</option>
                            ))}
                        </Select>
                        <Select
                            value={selectedSegmentKey}
                            onChange={(e) => setSelectedSegmentKey(e.target.value)}
                        >
                            {segments.map((segment) => (
                                <option key={segment.segmentKey} value={segment.segmentKey}>{segment.displayName}</option>
                            ))}
                        </Select>
                        <Select
                            value={selectedSegmentId}
                            onChange={(e) => setSelectedSegmentId(e.target.value)}
                        >
                            {segments.find(segment => segment.segmentKey === selectedSegmentKey)?.values.map((seg) => (
                                <option key={seg.segmentId} value={seg.segmentId}>{seg.displayName}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <button className="bg-destructive text-white py-2 px-4 rounded w-24" onClick={handleSave}>Cancel</button>
                        <button className="bg-primary text-white py-2 px-4 rounded  w-24" onClick={handleSave}>Save</button>
                    </div>
                </div>
            ) : (
                <div className='w-full max-w-[100rem] relative' role='button' tabIndex={0} onClick={() => setEditMode(true)}>
                    <div>
                        <h3 className="text-base font-medium">{cardDetails.metric.displayName}, {cardDetails.segmentId}</h3>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-lg">{snapshotData?.currentValue}</div>
                                <div className=" text-sm flex items-center">
                                    <span className={`text-[${chartColor}]`}>{changeIcon}</span>
                                    <span className="mr-1">{snapshotData?.gainsOrLossesPercentage}%</span>
                                    <span className='text-[grey]'>{changeIcon}7d</span>
                                </div>
                            </div>

                            {snapshotData?.snapshot.values && <div className="h-32 flex-grow max-w-[88%]">
                                <ChartSection data={snapshotData?.snapshot.values} />
                            </div>}
                        </div>
                    </div>

                    <button
                        style={{ pointerEvents: 'all' }}
                        aria-label='add KPI card'
                        className="absolute bottom-[50%] right-[-46px] w-8 h-8 invisible hover:visible z-[1]" onClick={(e) => { e.stopPropagation(); onAddCard(id) }}
                    >
                        <FaPlusCircle className='text-primary text-[1.25rem] bg-white ' />
                    </button>
                </div>
            )}

        </div >
    );
};

export default KpiCard;
