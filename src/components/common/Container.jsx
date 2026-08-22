import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Container = ({ children, className }) => {
  return (
    <div className={twMerge(clsx("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", className))}>
      {children}
    </div>
  );
};

export default Container;