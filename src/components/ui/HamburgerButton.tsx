import React from "react";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ open, onClick, className = "", ariaLabel }) => (
  <button
    className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 ${open ? 'bg-indigo-100' : 'hover:bg-indigo-100'} ${className}`}
    aria-label={ariaLabel || (open ? "Close menu" : "Open menu")}
    aria-expanded={open}
    aria-pressed={open}
    onClick={onClick}
    type="button"
  >
    <span className="block relative w-7 h-7">
      <span
        className={`absolute left-0 top-1/2 w-7 h-1 bg-indigo-700 rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
        style={{ transitionProperty: 'transform, background, opacity' }}
      />
      <span
        className={`absolute left-0 top-1/2 w-7 h-1 bg-indigo-700 rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`}
        style={{ transitionProperty: 'opacity, background' }}
      />
      <span
        className={`absolute left-0 top-1/2 w-7 h-1 bg-indigo-700 rounded transition-all duration-300 ${open ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
        style={{ transitionProperty: 'transform, background, opacity' }}
      />
    </span>
  </button>
);

export default HamburgerButton;
