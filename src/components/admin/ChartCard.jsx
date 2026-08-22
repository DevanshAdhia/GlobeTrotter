import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ChartCard.css';

const ChartCard = ({ title, data, dataKeys, colors, height = 300 }) => {
  const [timeframe, setTimeframe] = useState('7D');

  // data should be an object with keys: 7D, 30D, 90D, 1Y
  const chartData = data[timeframe] || data['7D'] || [];

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) return (tickItem / 1000000).toFixed(1) + 'M';
    if (tickItem >= 1000) return (tickItem / 1000).toFixed(0) + 'k';
    return tickItem;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="tooltip-item">
              <div className="tooltip-color-indicator" style={{ backgroundColor: entry.color }}></div>
              <span className="tooltip-name">{entry.name}:</span>
              <span className="tooltip-value">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-controls">
          <select 
            className="chart-select" 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7D">7D</option>
            <option value="30D">30D</option>
            <option value="90D">90D</option>
            <option value="1Y">1Y</option>
          </select>
        </div>
      </div>
      <div className="chart-container" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={formatYAxis}
              width={35}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '3 3' }}
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
