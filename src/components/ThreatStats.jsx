"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis } from 'recharts';

const tooltipStyle = {
  backgroundColor: '#0a0a0a',
  border: '1px solid rgba(212,175,55,0.2)',
  borderRadius: 8,
  fontSize: '0.7rem',
  padding: '8px 12px',
};

const barData = [
  { name: 'Mon', genuine: 12, fp: 34 },
  { name: 'Tue', genuine: 19, fp: 28 },
  { name: 'Wed', genuine: 32, fp: 45 },
  { name: 'Thu', genuine: 25, fp: 39 },
  { name: 'Fri', genuine: 40, fp: 50 },
];

export default function ThreatStats({ stats }) {
  const genuine = stats?.genuine_threats || 0;
  const fp = stats?.false_positives || 0;

  const pieData = [
    { name: 'Genuine', value: genuine || 1, color: '#D4AF37' },
    { name: 'False Positive', value: fp || 1, color: '#222' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ flex: 1, minHeight: 200 }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Signal Distribution</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
              {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#D4AF37' }} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8 }}>
          {pieData.map(d => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
              <span style={{ fontSize: '0.6rem', color: '#666', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{d.name}: {d.name === 'Genuine' ? genuine : fp}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 200 }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Weekly Trend</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData} barGap={2}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#555', fontWeight: 600 }} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(212,175,55,0.04)' }} />
            <Bar dataKey="genuine" stackId="a" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fp" stackId="a" fill="rgba(212,175,55,0.12)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
