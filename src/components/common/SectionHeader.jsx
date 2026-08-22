import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SectionHeader = ({ eyebrow, title, description, actionText, actionLink }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
      <div className="max-w-2xl">
        {eyebrow && <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">{eyebrow}</span>}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
        {description && <p className="text-gray-600 text-lg">{description}</p>}
      </div>
      {actionText && actionLink && (
        <Link to={actionLink} className="group inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
          {actionText}
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;