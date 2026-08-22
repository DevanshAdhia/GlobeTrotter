import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import Container from './Container';

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <Container>
        <nav className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/" className="hover:text-primary transition-colors flex items-center"><Home className="w-4 h-4" /></Link>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </Container>
    </div>
  );
};
export default Breadcrumb;