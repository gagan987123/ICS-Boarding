

interface NavigationProps {
  onSidebarToggle: () => void;
}

const Navigation = ({ onSidebarToggle }: NavigationProps) => {
  const navItems = ['Home', 'Resources', 'Policies', 'Support'];

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 sticky top-0 z-50 bg-black">
      <div className="flex items-center gap-3 select-none">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onSidebarToggle}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200 border border-gray-600 mr-3"
          aria-label="Toggle sidebar navigation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <img src="/Invenco_id84Hgn-m4_0.png" alt="Invenco by GVR Logo" width={40} height={40} className="transition-transform hover:scale-105" />
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tight text-white">Invenco</span>
          <span className="text-xs text-gray-400 font-medium tracking-wider">by GVR</span>
        </div>
      </div>
      <ul className="flex gap-6 text-sm font-medium text-gray-400">
        {navItems.map((item) => (
          <li key={item}>
            <a 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
