import React from 'react';

interface BentoGridItemProps {
  title: React.ReactNode;
  description: React.ReactNode;
  header: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({ title, description, header, icon, className }) => {
  return (
    <div className={`bento-grid-item ${className} relative h-max transition-all duration-800 ease-in-out`}>
      <div className="header mb-auto">
        {header}
      </div>
      <div className="content p-auto">
        <div className="flex items-center space-x-2 mb-2">
          {icon}
          <h3 className="text-xl font-semibold truncate">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm whitespace-normal break-words">{description}</p>
      </div>
    </div>
  );
};
