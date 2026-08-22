/* Generic placeholder — used until a phase builds the real page */
import EmptyState from '../../components/ui/EmptyState';

const PlaceholderPage = ({ title, icon, description }) => (
  <div>
    <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>{title}</h1>
    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>Coming in the next phase.</p>
    <div style={{
      background: 'var(--color-surface)',
      border: '1px dashed var(--color-border-strong)',
      borderRadius: 'var(--radius-xl)',
    }}>
      <EmptyState
        icon={icon}
        title={title}
        description={description || `This section is being built. Check back soon!`}
      />
    </div>
  </div>
);

export default PlaceholderPage;
