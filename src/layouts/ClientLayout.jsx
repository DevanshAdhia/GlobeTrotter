import { Outlet } from 'react-router-dom';
import Navbar from '../components/client/Navbar';

const ClientLayout = () => {
  return (
    <div className="client-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <Navbar />
      <main className="client-main" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
