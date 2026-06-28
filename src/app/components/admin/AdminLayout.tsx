import { useState } from 'react';
import { Navigate, Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, PlusCircle, LogOut, Menu, X, Shield, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import logoImage from '@/assets/70be82926b0ed207a1ebf683c489d9076556dc83.png';

export default function AdminLayout() {
  const { isAuthenticated, username, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirection guard
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects List', path: '/admin/projects', icon: FolderKanban },
    { name: 'Add New Project', path: '/admin/projects/new', icon: PlusCircle },
  ];

  // Helper to determine page titles based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/projects/new')) return 'Add New Project';
    if (path.includes('/edit')) return 'Edit Project';
    if (path.includes('/projects')) return 'Projects';
    return 'Admin Control Panel';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Header Bar */}
      <header className="md:hidden bg-secondary text-white h-16 px-4 flex items-center justify-between border-b-4 border-primary z-50">
        <div className="flex items-center gap-2">
          <img src={logoImage} alt="Superads Logo" className="h-10 w-auto" />
          <span className="font-bold text-sm tracking-wide" style={{ fontFamily: "'Algerian', serif" }}>
            SUPER ADS
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
          aria-label="Toggle navigation drawer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar - Desktop Layout / Collapsible Mobile Drawer */}
      <aside
        className={`bg-secondary text-white w-64 flex flex-col justify-between border-r-4 border-primary z-40 transition-transform duration-300 fixed md:translate-x-0 md:static top-16 md:top-0 bottom-0 left-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col">
          {/* Logo Brand Title (Desktop) */}
          <div className="hidden md:flex items-center gap-3 p-6 border-b border-white/10 bg-secondary/80">
            <img src={logoImage} alt="Superads Logo" className="h-12 w-auto" />
            <div style={{ fontFamily: "'Algerian', serif" }}>
              <div className="text-base font-bold tracking-wider leading-none text-white">
                <span style={{ color: '#4dd2ff' }}>S</span>
                <span className="text-primary">UPER </span>
                <span style={{ color: '#4dd2ff' }}>A</span>
                <span className="text-primary">DS</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/admin/projects'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                      isActive
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'border-transparent text-white/80 hover:text-white hover:bg-white/5 hover:border-white/10'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (User details, external site link, logout) */}
        <div className="p-4 border-t border-white/10 space-y-4 bg-secondary/60">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center py-2 text-xs font-semibold text-accent hover:text-white transition-colors hover:underline"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center justify-between gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <Shield className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs font-bold truncate text-white/95" title={username || 'Admin'}>
                {username || 'Admin'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-white/75 hover:text-primary rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header bar (Desktop Only) */}
        <header className="hidden md:flex items-center justify-between h-20 px-8 bg-white border-b-4 border-accent shadow-xs flex-shrink-0">
          <h2 className="text-lg font-black text-secondary uppercase tracking-wider">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground">Signed in as:</span>
            <span className="text-sm font-bold text-secondary bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
              {username || 'Administrator'}
            </span>
          </div>
        </header>

        {/* Content Body Router Outlet */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
