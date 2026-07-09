// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { registerUser } from '../api/auth';

// const Register = () => {
//   const [form, setForm] = useState({ username: '', email: '', phone_number: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await registerUser(form);
//       navigate('/login');
//     } catch (err) {
//       setError('Registration failed. Try a different username.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[80vh]">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-slate-900">Register</h2>
//         {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
//         <input name="username" placeholder="Username" onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" required />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
//         <input name="phone_number" placeholder="Phone Number" onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" required />
//         <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
//           Register
//         </button>
//         <p className="text-sm mt-4 text-center">
//           Already have an account? <Link to="/login" className="text-orange-500">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';
import logo from '../assets/NammaBus2.png';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', phone_number: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      const data = err.response?.data;
      if (data?.username) {
        setError('This username is already taken. Try another.');
      } else if (data?.password) {
        setError(Array.isArray(data.password) ? data.password[0] : data.password);
      } else {
        setError('Registration failed. Please check your details and try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex relative flex-col justify-between w-1/2 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-600 p-12 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-0 right-10 w-40 h-40 bg-amber-300/20 rounded-full"></div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        ></div>

        <div className="relative z-10">
          <img src={logo} alt="Namma Bus" className="h-14 w-auto brightness-0 invert" />
        </div>

        <div className="relative z-10">
          <svg viewBox="0 0 200 100" className="w-64 h-32 mb-6 drop-shadow-lg">
            <rect x="10" y="25" width="160" height="55" rx="10" fill="white" fillOpacity="0.95" />
            <rect x="20" y="35" width="30" height="20" rx="3" fill="#f97316" />
            <rect x="58" y="35" width="30" height="20" rx="3" fill="#f97316" />
            <rect x="96" y="35" width="30" height="20" rx="3" fill="#f97316" />
            <rect x="134" y="35" width="26" height="20" rx="3" fill="#fbbf24" />
            <rect x="10" y="65" width="160" height="8" fill="#1e293b" />
            <circle cx="45" cy="85" r="12" fill="#1e293b" />
            <circle cx="45" cy="85" r="5" fill="#94a3b8" />
            <circle cx="140" cy="85" r="12" fill="#1e293b" />
            <circle cx="140" cy="85" r="5" fill="#94a3b8" />
            <rect x="170" y="45" width="15" height="20" rx="3" fill="white" fillOpacity="0.95" />
          </svg>

          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Join thousands of happy travelers.
          </h2>
          <p className="text-white/90 text-base leading-relaxed max-w-md">
            Create your free account and start booking bus tickets across Karnataka
            with real-time seat selection and instant confirmation.
          </p>
        </div>

        <div className="relative z-10 flex gap-10 text-sm text-white/90 border-t border-white/20 pt-6">
          <div>
            <p className="text-2xl font-bold text-white">500+</p>
            <p>Daily Trips</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">50k+</p>
            <p>Happy Travelers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">4.7★</p>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>

        <div className="w-full max-w-sm relative z-10">
          <div className="lg:hidden flex justify-center mb-8">
            <img src={logo} alt="Namma Bus" className="h-16 w-auto" />
          </div>

          <div className="mb-8">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              CREATE ACCOUNT
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Get started for free</h2>
            <p className="text-slate-500 text-sm">Book your first ticket in minutes</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
              <div className="relative">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input
                  name="username"
                  placeholder="Choose a username"
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M11 18h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input
                  name="phone_number"
                  placeholder="98765 43210"
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.5A9.5 9.5 0 0112 5c5 0 9 4.5 9.9 7-.4 1.1-1 2.2-1.8 3.1M6.1 6.7C4 8.3 2.5 10.5 2.1 12c.9 2.5 4.9 7 9.9 7 1.6 0 3.1-.4 4.4-1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M2.1 12S6 5 12 5s9.9 7 9.9 7-3.9 7-9.9 7-9.9-7-9.9-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;