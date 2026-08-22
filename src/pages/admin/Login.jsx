import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For Phase 1, we just mock the login by navigating to the dashboard
    if (email && password) {
      navigate('/admin');
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

          <button type="submit" className="btn-primary login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
