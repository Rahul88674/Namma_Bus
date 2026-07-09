import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/buses', label: 'Buses' },
    { path: '/admin/routes', label: 'Routes' },
    { path: '/admin/trips', label: 'Trips' },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 flex gap-6">
      <aside className="w-48 shrink-0">
        <nav className="bg-white rounded-lg shadow-sm p-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded text-sm font-medium ${
                location.pathname === item.path
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;