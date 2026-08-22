import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      // Ensure we extract the token properly depending on FastAPI payload
      const token = response.data.access_token || response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        // Dispatch custom event to notify Contexts of login
        window.dispatchEvent(new Event('auth-change'));
        navigate('/admin');
      } else {
        setError('Login successful, but no token received.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🌍</div>
          <h2>GlobeTrotter</h2>
          <p>Admin Console</p>
        </div>
        
        <div className="login-welcome">
          <h3>Welcome back, Administrator.</h3>
          <p>Please sign in to continue to your dashboard.</p>
        </div>

        {error && <div className="error-alert" style={{ backgroundColor: 'var(--danger-light, #fee2e2)', color: 'var(--danger, #dc2626)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@globetrotter.com" 
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
            />
          </div>

          <div className="form-options">
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary login-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
