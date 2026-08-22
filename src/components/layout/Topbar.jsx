import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Star, MapPin, Users, Clock, Phone, Search } from 'lucide-react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="w-100" style={{ position: 'sticky', top: 0, zIndex: 1050 }}>
      {/* TOP STRIP - Dark Blue */}
      <div className="d-none d-lg-flex justify-content-between align-items-center px-4 py-2 text-white" style={{ backgroundColor: '#002b5e', fontSize: '12px' }}>
        <div className="d-flex align-items-center gap-4">
          <span className="d-flex align-items-center gap-2"><Star size={14} /> 15+ Years of Excellence</span>
          <span className="d-flex align-items-center gap-2"><MapPin size={14} /> 45+ Branches</span>
          <span className="d-flex align-items-center gap-2"><Users size={14} /> 50,000+ Happy Travelers</span>
          <span className="d-flex align-items-center gap-2"><Clock size={14} /> 24x7 Travel Support</span>
        </div>
        <div className="d-flex align-items-center gap-4">
          <span className="d-flex align-items-center gap-2 fw-bold"><Phone size={14} /> +91 99988 12345</span>
          <span style={{ cursor: 'pointer' }}>Talk to Expert</span>
          <div className="d-flex align-items-center gap-3 ms-2 ps-3 border-start border-light border-opacity-25">
            <svg xmlns="http://www.3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            <svg xmlns="http://www.3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <svg xmlns="http://www.3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </div>
        </div>
      </div>

      {/* MAIN NAV - White */}
      <Navbar bg="white" expand="lg" className="shadow-sm py-2 px-3">
        <Container fluid>
          {/* LOGO */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-end gap-1 me-lg-5">
            <div className="font-extrabold tracking-tight leading-none" style={{ color: '#002b5e', fontSize: '1.5rem', fontWeight: 800 }}>
              <span style={{ fontSize: '2rem' }}>I</span>nfinity
            </div>
            <div className="d-flex flex-column ms-1 leading-none mb-1">
              <span style={{ color: '#002b5e', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>TRAVEL</span>
              <span className="text-muted" style={{ fontSize: '6px', letterSpacing: '1px' }}>Dream. Travel. Explore.</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" className="border-0 shadow-none" />
          
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="mx-auto mb-2 mb-lg-0 fw-bold" style={{ fontSize: '14px' }}>
              <Nav.Link as={Link} to="/" className="px-3" style={{ color: '#002b5e' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/domestic-destinations" className="px-3" style={{ color: '#002b5e' }}>Domestic</Nav.Link>
              <Nav.Link as={Link} to="/international-destinations" className="px-3" style={{ color: '#002b5e' }}>International</Nav.Link>
              <Nav.Link as={Link} to="/weekend-gateways" className="px-3" style={{ color: '#002b5e' }}>Weekend Gateways</Nav.Link>
              <Nav.Link as={Link} to="/packages" className="px-3" style={{ color: '#002b5e' }}>Packages</Nav.Link>
              <Nav.Link as={Link} to="/deals" className="px-3" style={{ color: '#002b5e' }}>Deals</Nav.Link>
              <NavDropdown title={<span style={{ color: '#002b5e' }}>About Us</span>} id="about-dropdown" className="px-1">
                <NavDropdown.Item as={Link} to="/about">Our Story</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact">Contact Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
            <div className="d-flex align-items-center gap-3 ms-lg-4 mt-3 mt-lg-0">
              <Search className="d-none d-lg-block text-secondary" size={20} style={{ cursor: 'pointer' }} />
              <div className="d-none d-lg-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: '36px', height: '36px', cursor: 'pointer' }}>
                <Phone size={16} color="#002b5e" />
              </div>
              <button 
                onClick={() => navigate('/discover/goa')} 
                className="btn text-white fw-bold px-4" 
                style={{ backgroundColor: '#002b5e', fontSize: '14px' }}
              >
                Enquire Now
              </button>

              {user ? (
                <div className="ms-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=002b5e&color=fff`} alt="User" className="rounded-circle" style={{ width: '32px', height: '32px' }} />
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn btn-outline-primary d-lg-none mt-2 w-100 fw-bold" 
                >
                  Sign In
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Topbar;
