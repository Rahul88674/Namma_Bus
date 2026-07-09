// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCities } from '../api/routes';
// import CityAutocomplete from '../components/CityAutocomplete';

// const Home = () => {
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [date, setDate] = useState('');
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getCities().then((res) => setCities(res.data));
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/search?source=${source}&destination=${destination}&date=${date}`);
//   };

//   return (
//     <div className="flex flex-col items-center mt-16 px-4">
//       <h1 className="text-3xl font-bold text-slate-900 mb-8">Book Your Bus Ticket</h1>
//       <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl flex flex-col md:flex-row gap-4">
//         <CityAutocomplete
//           value={source}
//           onChange={setSource}
//           placeholder="From"
//           cities={cities}
//         />
//         <CityAutocomplete
//           value={destination}
//           onChange={setDestination}
//           placeholder="To"
//           cities={cities}
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="border rounded px-3 py-2"
//           required
//         />
//         <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Home;
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCities } from '../api/routes';
// import CityAutocomplete from '../components/CityAutocomplete';

// const Home = () => {
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [date, setDate] = useState('');
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getCities().then((res) => setCities(res.data));
//   }, []);

//   const today = new Date().toISOString().split('T')[0];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/search?source=${source}&destination=${destination}&date=${date}`);
//   };

//   const handleSwap = () => {
//     setSource(destination);
//     setDestination(source);
//   };

//   return (
//     <div className="relative">
//       {/* Hero section */}
//       <div className="bg-gradient-to-br from-slate-900 to-slate-800 pt-16 pb-28 px-4 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
//           Travel Smart, Travel <span className="text-orange-400">Namma Bus</span>
//         </h1>
//         <p className="text-slate-300 text-lg">
//           Comfortable, affordable bus tickets — booked in seconds.
//         </p>
//       </div>

//       {/* Search card - overlapping the hero */}
//       <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
//         <form onSubmit={handleSearch} className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
//           <div className="flex flex-col md:flex-row gap-4 md:items-end">
//             <div className="flex-1">
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
//                 From
//               </label>
//               <CityAutocomplete
//                 value={source}
//                 onChange={setSource}
//                 placeholder="Departure city"
//                 cities={cities}
//               />
//             </div>

//             <button
//               type="button"
//               onClick={handleSwap}
//               className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-300 mb-0.5 shrink-0"
//               title="Swap cities"
//             >
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path d="M7 7h13m0 0l-4-4m4 4l-4 4M17 17H4m0 0l4 4m-4-4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </button>

//             <div className="flex-1">
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
//                 To
//               </label>
//               <CityAutocomplete
//                 value={destination}
//                 onChange={setDestination}
//                 placeholder="Destination city"
//                 cities={cities}
//               />
//             </div>

//             <div className="flex-1">
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
//                 Date of Journey
//               </label>
//               <input
//                 type="date"
//                 min={today}
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-sm"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-orange-500 text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-orange-600 transition-colors shrink-0"
//             >
//               Search Buses
//             </button>
//           </div>
//         </form>

//         {/* Quick trust badges */}
//         <div className="flex justify-center gap-8 mt-8 text-sm text-slate-500">
//           <span className="flex items-center gap-2">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
//               <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             Verified Operators
//           </span>
//           <span className="flex items-center gap-2">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
//               <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             Instant Confirmation
//           </span>
//           <span className="flex items-center gap-2">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
//               <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             Secure Booking
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCities } from '../api/routes';
import CityAutocomplete from '../components/CityAutocomplete';

const Home = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCities().then((res) => setCities(res.data));
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?source=${source}&destination=${destination}&date=${date}`);
  };

  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <div className="relative">
      {/* Hero section with decorative elements */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950 pt-16 pb-32 px-4 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl"></div>

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        ></div>

        {/* Road line decoration */}
        <div className="absolute bottom-16 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"></div>

        <div className="relative z-10">
          <span className="inline-block bg-white/10 backdrop-blur text-orange-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/10">
            🚌 KARNATAKA'S TRUSTED BUS BOOKING PLATFORM
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Travel Smart, Travel <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Namma Bus</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Comfortable, affordable bus tickets — booked in seconds.
          </p>
        </div>
      </div>

      {/* Search card - overlapping the hero */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <form onSubmit={handleSearch} className="bg-white shadow-2xl shadow-slate-900/10 rounded-2xl p-6 md:p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 21c-4-4.5-7-8-7-11a7 7 0 1114 0c0 3-3 6.5-7 11z" stroke="currentColor" strokeWidth="2" />
                </svg>
                From
              </label>
              <CityAutocomplete
                value={source}
                onChange={setSource}
                placeholder="Departure city"
                cities={cities}
              />
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50 transition-colors mb-0.5 shrink-0"
              title="Swap cities"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 7h13m0 0l-4-4m4 4l-4 4M17 17H4m0 0l4 4m-4-4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 21c-4-4.5-7-8-7-11a7 7 0 1114 0c0 3-3 6.5-7 11z" stroke="currentColor" strokeWidth="2" />
                </svg>
                To
              </label>
              <CityAutocomplete
                value={destination}
                onChange={setDestination}
                placeholder="Destination city"
                cities={cities}
              />
            </div>

            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 10h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Date of Journey
              </label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-8 py-2.5 rounded-lg hover:shadow-lg hover:shadow-orange-200 transition-all shrink-0"
            >
              Search Buses
            </button>
          </div>
        </form>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Verified Operators
          </span>
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Instant Confirmation
          </span>
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Secure Booking
          </span>
        </div>
      </div>

      {/* Bottom spacing before next section */}
      {/* <div className="h-16"></div> */}
      {/* Why Choose Us - professional feature strip */}
      <div className="max-w-5xl mx-auto px-4 mt-20 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Why Travel With Namma Bus</h2>
            <p className="text-slate-500 text-sm">Reliable service, built around you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                  <path d="M3 12l2-6h14l2 6M5 12h14v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H8v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <circle cx="7.5" cy="15.5" r="1" fill="currentColor" />
                  <circle cx="16.5" cy="15.5" r="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1.5">Wide Bus Network</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Buses connecting major cities across Karnataka, daily.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                  <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1.5">Live Seat Selection</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pick your exact seat with real-time availability.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                  <path d="M12 3l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.8L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1.5">Instant Confirmation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Get your ticket confirmed the moment you book.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                  <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1.5">Secure Payments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your transactions are safe and protected end-to-end.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default Home;