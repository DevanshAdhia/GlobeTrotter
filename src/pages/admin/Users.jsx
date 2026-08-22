import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import { downloadCSV } from '../../utils/exportUtils';
import './Users.css';

const Users = () => {
  const { users, addUser } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newUser, setNewUser] = useState({ user: '', email: '', status: 'Active' });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (user) => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleExport = () => {
    const exportData = filteredUsers.map(u => ({
      ID: u.id,
      Name: u.user,
      Email: u.email,
      Joined: u.joined,
      Trips: u.trips,
      Status: u.status
    }));
    downloadCSV(exportData, 'globetrotter_users');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.user || !newUser.email) return;

    addUser({
      avatar: newUser.user.charAt(0).toUpperCase(),
      user: newUser.user,
      email: newUser.email,
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      trips: 0,
      status: newUser.status
    });
    
    setIsModalOpen(false);
    setNewUser({ user: '', email: '', status: 'Active' });
  };

  const columns = [
    { 
      header: 'User', 
      accessor: 'user',
      render: (row) => (
        <div className="table-user-cell" onClick={() => navigate(`/admin/users/${row.id}`)} style={{cursor: 'pointer'}}>
          <div className="table-avatar">{row.avatar}</div>
          <div className="table-user-info">
            <span className="table-user-name">{row.user}</span>
            <span className="table-user-email">{row.email}</span>
          </div>
        </div>
      )
    },
    { header: 'Joined', accessor: 'joined' },
    { header: 'Trips', accessor: 'trips' },
    { header: 'Status', accessor: 'status', isStatus: true }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Users</h2>
          <p className="page-subtitle">Manage GlobeTrotter users and account activity.</p>
        </div>
        <div className="page-actions">
          <button className="btn-secondary" onClick={handleExport}>Export</button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Add User</button>
        </div>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <DataTable 
        title={`All Users (${filteredUsers.length})`}
        columns={columns}
        data={filteredUsers}
        onActionClick={handleAction}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
        <form onSubmit={handleAddUser}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={newUser.user} onChange={e => setNewUser({...newUser, user: e.target.value})} required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Initial Status</label>
            <select value={newUser.status} onChange={e => setNewUser({...newUser, status: e.target.value})}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Create User</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
