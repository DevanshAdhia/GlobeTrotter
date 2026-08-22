import { useState } from 'react';
import { useClient } from '../../context/ClientContext';
import { User, Mail, Globe, Lock, Shield, Settings } from 'lucide-react';

const Profile = () => {
  const { currentUser, setCurrentUser } = useClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '2rem' }}>
      
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Profile & Settings</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your personal information and preferences.</p>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
              {currentUser.avatar}
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.25rem 0' }}>{currentUser.name}</h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{currentUser.email}</p>
            </div>
          </div>
          <button 
            className={isEditing ? 'btn-secondary' : 'btn-primary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Display Name</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value, avatar: e.target.value.charAt(0).toUpperCase()})}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </form>
        ) : (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Globe size={20} className="text-primary" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>Language</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>English (US)</p>
                </div>
              </div>
              <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Change</button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Lock size={20} className="text-primary" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>Password & Security</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Last updated 2 months ago</p>
                </div>
              </div>
              <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Update</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Shield size={20} className="text-primary" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>Privacy</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Public profile visibility</p>
                </div>
              </div>
              <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Manage</button>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings size={20} /> Application Settings
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Global application preferences are managed here.</p>
        
        <div style={{ padding: '1rem', border: '1px solid var(--danger)', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--danger)' }}>Danger Zone</h4>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Once you delete your account, there is no going back. Please be certain.</p>
          <button className="btn-secondary" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Delete Account</button>
        </div>
      </div>

    </div>
  );
};

export default Profile;
