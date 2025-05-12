import React from 'react';

/**
 * Header Component
 * 
 * Application header with title and actions.
 * 
 * @param {Object} props
 * @param {string} [props.title='Presentation Builder'] - Application title
 * @param {React.ReactNode} [props.actions] - Action buttons or controls
 * @param {string} [props.className=''] - Additional CSS classes
 */
function Header({ 
  title = 'Presentation Builder', 
  actions, 
  className = '' 
}) {
  return (
    <div className={`bg-gray-900 text-white py-4 px-6 ${className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {actions && (
          <div className="flex space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;