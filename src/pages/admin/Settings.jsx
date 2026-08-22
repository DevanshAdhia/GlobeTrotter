import { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0' }}>
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p className="page-subtitle">Manage platform configuration and your preferences.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>Appearance</h3>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className={`btn-secondary ${theme === 'light' ? 'btn-primary' : ''}`}
              style={{ flex: 1, padding: '1rem', border: theme === 'light' ? 'none' : '1px solid var(--border)' }}
              onClick={() => handleThemeChange('light')}
            >
              Light Mode
            </button>
            <button 
              className={`btn-secondary ${theme === 'dark' ? 'btn-primary' : ''}`}
              style={{ flex: 1, padding: '1rem', border: theme === 'dark' ? 'none' : '1px solid var(--border)' }}
              onClick={() => handleThemeChange('dark')}
            >
              Dark Mode
            </button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>Notifications</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Email Alerts</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive daily summary reports via email</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
              <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{ 
                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: emailAlerts ? 'var(--primary)' : 'var(--border)', 
                transition: '0.4s', borderRadius: '24px' 
              }}>
                <span style={{
                  position: 'absolute', height: '18px', width: '18px', left: emailAlerts ? '22px' : '3px', bottom: '3px',
                  backgroundColor: 'white', transition: '0.4s', borderRadius: '50%'
                }}></span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
