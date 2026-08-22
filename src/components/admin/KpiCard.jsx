import { TrendingUp, TrendingDown } from 'lucide-react';
import './KpiCard.css';

const KpiCard = ({ title, value, trend, isPositive, label, icon: Icon }) => {
  // Generate a random-ish subtle color based on title length or just default
  const getSubtleColor = () => {
    if (title.includes('User')) return 'var(--primary)';
    if (title.includes('Trip')) return 'var(--success)';
    if (title.includes('Dest')) return 'var(--warning)';
    if (title.includes('Acti')) return 'var(--danger)';
    return 'var(--info)';
  };
  const color = getSubtleColor();

  return (
    <div className="card kpi-card">
      <div 
        className="kpi-glow-bg"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`
        }}
      ></div>

      <div style={{ position: 'relative', zIndex: 3 }}>
        <div className="kpi-header">
          <h3 className="kpi-title">{title}</h3>
          <div className="kpi-icon-wrapper" style={{ color: color, backgroundColor: `${color}15`, padding: '8px', borderRadius: '8px' }}>
            <Icon size={20} className="kpi-icon" />
          </div>
        </div>
        <div className="kpi-content">
          <div className="kpi-value" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', margin: '0.5rem 0' }}>{value}</div>
          <div className="kpi-trend-wrapper">
            <span className={`kpi-trend ${isPositive ? 'positive' : 'negative'}`} style={{ fontWeight: 600 }}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trend}
            </span>
            {label && <span className="kpi-label">{label}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
