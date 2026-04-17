"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis } from 'recharts';

const data = [
  { name: 'Genuine', value: 128, color: '#D4AF37' },
  { name: 'False Positive', value: 354, color: '#444444' },
];

const barData = [
  { name: 'MON', genuine: 12, fp: 34 },
  { name: 'TUE', genuine: 19, fp: 28 },
  { name: 'WED', genuine: 32, fp: 45 },
  { name: 'THU', genuine: 25, fp: 39 },
  { name: 'FRI', genuine: 40, fp: 50 },
];

const ThreatStats = () => {
  return (
    <div className="flex flex-col h-full gap-10">
      <div className="h-1/2 min-h-[220px]">
        <p className="text-[10px] text-accent mb-6 uppercase tracking-[0.2em] font-bold">Signal Distribution</p>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={10}
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #D4AF37', borderRadius: '0px' }}
              itemStyle={{ color: '#D4AF37', fontSize: '10px', textTransform: 'uppercase' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-8 mt-4">
          {data.map(item => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="w-2 h-2 border border-accent" style={{ backgroundColor: item.color }}></div>
              <span className="text-[9px] text-text-secondary uppercase tracking-widest font-semibold">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-1/2 min-h-[220px] pt-8">
        <p className="text-[10px] text-accent mb-6 uppercase tracking-[0.2em] font-bold">Weekly Performance Metric</p>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={barData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D4AF37', letterSpacing: 1 }} />
            <Tooltip 
              cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }}
              contentStyle={{ backgroundColor: '#000', border: '1px solid #D4AF37', borderRadius: '0px' }}
              itemStyle={{ fontSize: '10px' }}
            />
            <Bar dataKey="genuine" stackId="a" fill="#D4AF37" />
            <Bar dataKey="fp" stackId="a" fill="rgba(212, 175, 55, 0.1)" stroke="#D4AF37" strokeWidth={0.5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatStats;
