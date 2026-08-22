import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ChartCard.css';

const ChartCard = ({ title, data, dataKeys, colors, height = 300 }) => {
  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-controls">
          <select className="chart-select">
            <option>7D</option>
            <option>30D</option>
            <option>90D</option>
            <option>1Y</option>
          </select>
        </div>
      </div>
      <div className="chart-container" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index]} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={colors[index]} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--surface)', 
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-md)'
              }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            {dataKeys.map((key, index) => (
              <Area 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={colors[index]} 
                fillOpacity={1} 
                fill={`url(#color${key})`} 
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
