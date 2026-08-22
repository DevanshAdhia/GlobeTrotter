import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { ArrowLeft, Edit, ShieldBan, Trash2, Mail, Calendar } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import './UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUserStatus, deleteUser, editUser, trips } = useAdmin();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });
  
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div className="page-container">
        <h2>User not found</h2>
        <button className="btn-secondary" onClick={() => navigate('/admin/users')}>Back to Users</button>
      </div>
    );
  }

  // Dynamic stats
  const userTrips = trips.filter(t => t.user_id === user.id);
  const publicTripsCount = userTrips.filter(t => t.visibility === 'Public' || t.status === 'published').length;

  const handleSuspend = () => {
    updateUserStatus(user.id, !user.is_active);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(user.id);
      navigate('/admin/users');
    }
  };

  const handleOpenEdit = () => {
    setEditFormData({ name: user.name || '', email: user.email });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editUser(user.id, { 
      name: editFormData.name, 
      email: editFormData.email
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="breadcrumb-nav">
        <button className="btn-icon-text" onClick={() => navigate('/admin/users')}>
          <ArrowLeft size={16} /> Back to Users
        </button>
      </div>

      <div className="card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        {/* Subtle decorative glow */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            <div style={{ 
              width: '90px', height: '90px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--surface-light) 0%, var(--background) 100%)', 
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.05)', 
              border: '1px solid var(--border)',
              lineHeight: 1
            }}>
              <span style={{ display: 'block', marginTop: '0.1em' }}>
                {user.profile_photo || (user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U')}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.875rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  {user.name || 'Unnamed User'}
                </h2>
                <span className={`status-badge status-${user.is_active ? 'success' : 'danger'}`} style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', border: `1px solid ${user.is_active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}` }}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Mail size={15} /> {user.email}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Calendar size={15} /> Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="btn-secondary flex-center gap-sm" onClick={handleOpenEdit} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border)' }}>
              <Edit size={16} /> Edit Profile
            </button>
            <button className={`btn-secondary flex-center gap-sm`} onClick={handleSuspend} style={{ padding: '0.5rem 1rem', background: 'transparent', color: !user.is_active ? 'var(--success)' : 'var(--warning)', border: `1px solid ${!user.is_active ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}` }}>
              <ShieldBan size={16} /> {!user.is_active ? 'Activate' : 'Suspend'}
            </button>
            <button className="btn-danger flex-center gap-sm" onClick={handleDelete} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--danger)' }}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="user-details-grid">
        <div className="user-overview card">
          <h3>Overview</h3>
          <div className="overview-stats">
            <div className="stat-box">
              <span className="stat-value">{userTrips.length}</span>
              <span className="stat-label">Total Trips</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{publicTripsCount}</span>
              <span className="stat-label">Public Trips</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">0</span>
              <span className="stat-label">Saved Destinations</span>
            </div>
          </div>
        </div>

        <div className="user-timeline card">
          <h3>Recent Activity</h3>
          <div className="timeline">
            {userTrips.length > 0 ? (
              userTrips.slice(0, 3).map((t, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <p>Created Trip <strong>{t.trip}</strong></p>
                    <span className="timeline-time">{t.dates || 'Recently'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No recent activity.</p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User">
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserDetails;
