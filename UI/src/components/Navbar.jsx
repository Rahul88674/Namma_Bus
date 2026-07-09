// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold">Namma Bus</Link>
//       <div className="flex gap-4 items-center">
//         <Link to="/" className="hover:text-orange-400">Search</Link>
//         {user && <Link to="/my-bookings" className="hover:text-orange-400">My Bookings</Link>}
//         {user?.role === 'ADMIN' && <Link to="/admin" className="hover:text-orange-400">Admin</Link>}
//         {user ? (
//           <button onClick={handleLogout} className="bg-orange-500 px-4 py-1.5 rounded hover:bg-orange-600">
//             Logout
//           </button>
//         ) : (
//           <Link to="/login" className="bg-orange-500 px-4 py-1.5 rounded hover:bg-orange-600">
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/NammaBus2.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // <nav className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center">
    <nav className="bg-slate-900 text-white px-6 py-2 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Namma Bus" className="h-20 w-auto" />Namma Bus
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-orange-400">Search</Link>
        {user && <Link to="/my-bookings" className="hover:text-orange-400">My Bookings</Link>}
        {user?.role === 'ADMIN' && <Link to="/admin" className="hover:text-orange-400">Admin</Link>}
        {user ? (
          <button onClick={handleLogout} className="bg-orange-500 px-4 py-1.5 rounded hover:bg-orange-600">
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-orange-500 px-4 py-1.5 rounded hover:bg-orange-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;