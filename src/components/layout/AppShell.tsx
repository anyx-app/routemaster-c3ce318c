import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Truck, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Menu,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';

export default function AppShell() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Route Planner', icon: Map, path: '/routes' },
    { label: 'Fleet Manager', icon: Truck, path: '/vehicles' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-slate-900/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ease-in-out flex flex-col z-20 relative`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-[32px] h-8 rounded-lg bg-gradient-to-br from-[#007BFF] to-[#0056b3] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              RM
            </div>
            <span className={`font-bold text-xl tracking-tight text-white whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              RouteMaster
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 w-6 h-6 bg-[#007BFF] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg z-30"
        >
          {isSidebarOpen ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-[#007BFF] text-white shadow-[0_0_20px_rgba(0,123,255,0.3)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={22} className={`min-w-[22px] transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span className={`font-medium text-sm whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute left-12'}`}>
                  {item.label}
                </span>
                
                {/* Active Indicator Dot */}
                {!isSidebarOpen && isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/5">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFC107] to-orange-500 border-2 border-slate-800 flex items-center justify-center text-slate-900 font-bold shadow-lg min-w-[40px]">
              JD
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">John Driver</p>
                <p className="text-xs text-slate-400 truncate">Logistics Manager</p>
              </div>
            )}
            {isSidebarOpen && <LogOut size={16} className="text-slate-500 hover:text-white transition-colors" />}
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-white/80 font-medium tracking-wide">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#007BFF] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search routes, drivers..." 
                className="bg-slate-800/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-[#007BFF]/50 focus:bg-slate-800 transition-all w-64 placeholder:text-slate-600"
              />
            </div>
            
            <button className="relative p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFC107] shadow-[0_0_8px_#FFC107]" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 relative">
           {/* Background Mesh Effect */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
           
           <div className="relative z-0">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
}
