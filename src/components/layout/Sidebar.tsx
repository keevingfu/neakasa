import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationConfig } from '../../navigation-config';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Neakasa</h1>
      </div>
      <nav className="mt-4">
        {navigationConfig.map((item) => (
          <div key={item.id}>
            <div
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                isActive(item.path) ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => item.children && toggleExpanded(item.id)}
            >
              <Link to={item.path} className="block text-gray-700">
                {item.name}
                {item.children && (
                  <span className="float-right">
                    {expandedItems.includes(item.id) ? '▼' : '▶'}
                  </span>
                )}
              </Link>
            </div>
            {item.children && expandedItems.includes(item.id) && (
              <div className="ml-4">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    to={child.path}
                    className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                      isActive(child.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
