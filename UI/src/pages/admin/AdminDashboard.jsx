// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-6">Admin Dashboard</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <Link to="/admin/buses" className="bg-white shadow rounded-lg p-6 hover:shadow-md">
//           <p className="font-semibold">Manage Buses</p>
//           <p className="text-sm text-slate-500 mt-1">Add buses and seat layouts</p>
//         </Link>
//         <Link to="/admin/routes" className="bg-white shadow rounded-lg p-6 hover:shadow-md">
//           <p className="font-semibold">Manage Routes</p>
//           <p className="text-sm text-slate-500 mt-1">Define source-destination routes</p>
//         </Link>
//         <Link to="/admin/trips" className="bg-white shadow rounded-lg p-6 hover:shadow-md">
//           <p className="font-semibold">Manage Trips</p>
//           <p className="text-sm text-slate-500 mt-1">Schedule buses on routes</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../../api/bookings';

const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}>
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </div>
);

const ManageCard = ({ to, title, description, icon }) => (
  <Link
    to={to}
    className="bg-white border border-slate-200 rounded-xl p-6 hover:border-orange-300 hover:shadow-md transition-all flex items-start gap-4"
  >
    <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500 mt-0.5">{description}</p>
    </div>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Admin Dashboard</h2>
      <p className="text-slate-500 text-sm mb-6">Overview of your bus booking platform</p>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 h-24 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Buses"
            value={stats?.total_buses ?? 0}
            accent="bg-blue-50 text-blue-500"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="7.5" cy="19" r="1.5" fill="currentColor" />
                <circle cx="16.5" cy="19" r="1.5" fill="currentColor" />
              </svg>
            }
          />
          <StatCard
            label="Upcoming Trips"
            value={stats?.upcoming_trips ?? 0}
            accent="bg-purple-50 text-purple-500"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 10h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
          <StatCard
            label="Total Bookings"
            value={stats?.total_bookings ?? 0}
            accent="bg-emerald-50 text-emerald-500"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <StatCard
            label="Total Revenue"
            value={`₹${stats?.total_revenue ?? 0}`}
            accent="bg-orange-50 text-orange-500"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
        </div>
      )}

      {/* Management links */}
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Manage</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <ManageCard
          to="/admin/buses"
          title="Manage Buses"
          description="Add buses and seat layouts"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-orange-500">
              <rect x="3" y="6" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="7.5" cy="19" r="1.5" fill="currentColor" />
              <circle cx="16.5" cy="19" r="1.5" fill="currentColor" />
            </svg>
          }
        />
        <ManageCard
          to="/admin/routes"
          title="Manage Routes"
          description="Define source-destination routes"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-orange-500">
              <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 7l8 10" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" />
            </svg>
          }
        />
        <ManageCard
          to="/admin/trips"
          title="Manage Trips"
          description="Schedule buses on routes"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-orange-500">
              <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 10h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      {/* Recent bookings */}
      {stats?.recent_bookings?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Recent Bookings</h3>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-left">
                <tr>
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Fare</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_bookings.map((b) => (
                  <tr key={b.booking_id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-mono text-xs">{b.booking_id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-3">{b.user}</td>
                    <td className="px-4 py-3">{b.route}</td>
                    <td className="px-4 py-3">₹{b.fare}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;