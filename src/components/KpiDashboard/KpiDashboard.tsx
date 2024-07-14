import React, { useState, useEffect } from 'react';
import { Metric, Segment } from '../../types';
import { getMetrics, getSegments } from '../../apis';
import KpiCard from '../KpiCard';

import styles from './kpiDashboard.module.css';


let idCounter = 0;
const generateUniqueId = () => `id-${idCounter++}`;

const KpiDashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [kpiCards, setKpiCards] = useState<Array<{ id: string, metric: Metric; segmentKey: string; segmentId: string }>>([]);

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
            const metricsData = await getMetrics();
            const segmentsData = await getSegments();
            if (isCancelled) return;
            setMetrics(metricsData);
            setSegments(segmentsData);
        };
        fetchData();
        return () => {
            isCancelled = true
        }
    }, []);

    const addCard = (id?: string) => {
        const newCard = { id: generateUniqueId(), metric: metrics?.[0], segmentKey: segments?.[0]?.segmentKey, segmentId: segments[0]?.values?.[0]?.segmentId };
        const updatedCards = [...kpiCards];
        if (!id) {
            updatedCards.splice(0, 0, newCard);
        } else {
            let index = updatedCards.findIndex((ele) => ele.id === id);
            if (index === -1) {
                return;
            }
            updatedCards.splice(index + 1, 0, newCard);
        }
        setKpiCards(updatedCards);
    };

    const handleSave = (index: number, metric: Metric, segmentKey: string, segmentId: string) => {
        const updatedCards = [...kpiCards];
        updatedCards[index] = { ...updatedCards[index], metric, segmentKey, segmentId };
        setKpiCards(updatedCards);
    };
    const baseCols = kpiCards.length > 2 ? 2 : kpiCards.length || 1;
    const lgCols = kpiCards.length > 3 ? 3 : kpiCards.length || 1;
    const gridClass = `grid grid-cols-1 sm:grid-cols-${baseCols} lg:grid-cols-${lgCols} gap-x-6 gap-y-12 justify-center items-center`;

    return (
        <div className="py-8 mx-4">
            {kpiCards.length === 0 ? (
                <div className='flex justify-center p-4'>
                    <button
                        className="bg-primary text-white py-2 px-4 rounded"
                        disabled={metrics === null || segments === null}
                        onClick={() => addCard()}
                    >
                        Add KPI Card
                    </button>
                </div>
            ) :
                (<div className="relative bg-white rounded-2xl shadow p-8">
                    <div className={gridClass}>

                        {kpiCards.map((card, index) => {

                            return (<div key={card?.id} className={` ${styles['vertical-border']} relative min-h-[10.5rem] pr-6`}>
                                <KpiCard
                                    id={card?.id}
                                    cardDetails={card}
                                    metrics={metrics}
                                    segments={segments}
                                    onAddCard={addCard}
                                    onCancel={() => { }}
                                    onSave={(metric, segmentKey, segmentId) => handleSave(index, metric, segmentKey, segmentId)}
                                />
                            </div>);
                        })}

                    </div>
                </div>
                )}
        </div >
    );
};

export default KpiDashboard;
