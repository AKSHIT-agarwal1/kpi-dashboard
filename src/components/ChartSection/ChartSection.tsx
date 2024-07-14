import React from 'react';


import {
    AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';

interface ChartSectionProps {
    data: any[],
}


const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
            >
                <defs>
                    {/* Gradient for the area fill */}
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        {/* Gradient from top (darker shade) to bottom (lighter shade) */}
                        <stop offset="0%" stopColor={"#119F97"} stopOpacity={0.2} /> {/* Top: Darker shade */}
                        <stop offset="100%" stopColor={"#119F97"} stopOpacity={0} /> {/* Bottom: Lighter shade */}
                    </linearGradient>

                    {/* Gradient for the line stroke */}
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        {/* Gradient from right (full opacity) to left (transparent) */}
                        <stop offset="0%" stopColor={"#119F97"} stopOpacity={0} />{/* Left: Transparent */}
                        <stop offset="100%" stopColor={"#119F97"} stopOpacity={1} /> {/* Right: Full opacity */}
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" hide orientation="bottom" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="url(#lineGradient)"  // Apply gradient to line stroke
                    fill="url(#colorUv)"        // Apply gradient to area fill
                    fillOpacity={1}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ChartSection;
