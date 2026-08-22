import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import CommandPalette from '../components/admin/CommandPalette';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true); // Always collapse (hide) sidebar on mobile load
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        closeMobileSidebar={closeMobileSidebar}
      />
      
      <main className="admin-main">
        <Topbar 
          toggleMobileSidebar={toggleSidebar} 
          openCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        
        <div className="admin-content">
          <Outlet />
        </div>
      </main>

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </div>
  );
};

export default AdminLayout;
