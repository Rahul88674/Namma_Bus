// import { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { searchTrips } from '../api/routes';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const source = searchParams.get('source');
//   const destination = searchParams.get('destination');
//   const date = searchParams.get('date');

//   useEffect(() => {
//     setLoading(true);
//     searchTrips({ source, destination, date })
//       .then((res) => setTrips(res.data))
//       .catch(() => setTrips([]))
//       .finally(() => setLoading(false));
//   }, [source, destination, date]);

//   if (loading) return <div className="text-center mt-10">Loading trips...</div>;

//   return (
//     <div className="max-w-4xl mx-auto mt-8 px-4">
//       <h2 className="text-xl font-semibold mb-4">
//         {source} → {destination} on {date}
//       </h2>
//       {trips.length === 0 ? (
//         <p className="text-slate-500">No trips found for this route/date.</p>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {trips.map((trip) => (
//             <div key={trip.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
//               <div>
//                 <p className="font-semibold text-lg">{trip.bus.name}</p>
//                 <p className="text-sm text-slate-500">{trip.bus.bus_type}</p>
//                 <p className="text-sm mt-1">
//                   Departure: {new Date(trip.departure_datetime).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-green-600">{trip.available_seats_count} seats available</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xl font-bold text-orange-500">₹{trip.fare}</p>
//                 <button
//                   onClick={() => navigate(`/trip/${trip.id}`)}
//                   className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//                 >
//                   Select Seats
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchTrips } from '../api/routes';

const BUS_TYPE_LABELS = {
  AC_SEATER: 'AC Seater',
  NON_AC_SEATER: 'Non-AC Seater',
  AC_SLEEPER: 'AC Sleeper',
  NON_AC_SLEEPER: 'Non-AC Sleeper',
};

const formatTime = (dt) =>
  new Date(dt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

const formatDuration = (start, end) => {
  const ms = new Date(end) - new Date(start);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('departure');
  const navigate = useNavigate();

  const source = searchParams.get('source');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');

  useEffect(() => {
    setLoading(true);
    searchTrips({ source, destination, date })
      .then((res) => setTrips(res.data))
      .catch(() => setTrips([]))
      .finally(() => setLoading(false));
  }, [source, destination, date]);

  const sortedTrips = [...trips].sort((a, b) => {
    if (sortBy === 'fare') return a.fare - b.fare;
    if (sortBy === 'seats') return b.available_seats_count - a.available_seats_count;
    return new Date(a.departure_datetime) - new Date(b.departure_datetime);
  });

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-16">
      {/* Search summary bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
          <span>{source}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-orange-400">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{destination}</span>
          <span className="text-slate-400 font-normal text-sm ml-2">
            {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-orange-500 font-medium hover:underline"
        >
          Modify Search
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
              <div className="h-3 bg-slate-100 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : sortedTrips.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-orange-400">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1.5">No buses found</h3>
          <p className="text-sm text-slate-500 mb-6">
            We couldn't find any trips for this route on the selected date.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600"
          >
            Try Another Search
          </button>
        </div>
      ) : (
        <>
          {/* Results count + sort */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">{sortedTrips.length} buses found</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Sort by:</span>
              {[
                { key: 'departure', label: 'Departure' },
                { key: 'fare', label: 'Price' },
                { key: 'seats', label: 'Seats' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={`px-3 py-1 rounded-full font-medium ${
                    sortBy === opt.key
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {sortedTrips.map((trip) => {
              const seatsLow = trip.available_seats_count > 0 && trip.available_seats_count <= 5;
              const soldOut = trip.available_seats_count === 0;

              return (
                <div
                  key={trip.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-800">{trip.bus.name}</p>
                        <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                          {BUS_TYPE_LABELS[trip.bus.bus_type] || trip.bus.bus_type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div>
                          <p className="font-bold text-slate-800">{formatTime(trip.departure_datetime)}</p>
                          <p className="text-xs text-slate-400">{trip.route?.source || source}</p>
                        </div>
                        <div className="flex flex-col items-center px-2 flex-1 min-w-[60px]">
                          <p className="text-[11px] text-slate-400 mb-1">
                            {formatDuration(trip.departure_datetime, trip.arrival_datetime)}
                          </p>
                          <div className="w-full h-px bg-slate-200 relative">
                            <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-orange-400"></div>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{formatTime(trip.arrival_datetime)}</p>
                          <p className="text-xs text-slate-400">{trip.route?.destination || destination}</p>
                        </div>
                      </div>

                      <p className={`text-xs mt-3 font-medium ${soldOut ? 'text-red-500' : seatsLow ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {soldOut ? 'Sold Out' : `${trip.available_seats_count} seats available`}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-[11px] text-slate-400">Starting from</p>
                        <p className="text-2xl font-bold text-orange-500">₹{trip.fare}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/trip/${trip.id}`)}
                        disabled={soldOut}
                        className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                      >
                        {soldOut ? 'Unavailable' : 'Select Seats'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;