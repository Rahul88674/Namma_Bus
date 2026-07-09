// import { useEffect, useState } from 'react';
// import { getMyBookings, cancelBooking } from '../api/bookings';

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = () => {
//     getMyBookings().then((res) => setBookings(res.data)).finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancel = async (bookingId) => {
//     if (!confirm('Cancel this booking?')) return;
//     await cancelBooking(bookingId);
//     fetchBookings();
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-8 px-4">
//       <h2 className="text-xl font-semibold mb-6">My Bookings</h2>
//       {bookings.length === 0 ? (
//         <p className="text-slate-500">No bookings yet.</p>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {bookings.map((b) => (
//             <div key={b.id} className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-semibold">Booking ID: {b.booking_id}</p>
//                   <p className="text-sm text-slate-500">Status: {b.status}</p>
//                   <p className="text-sm mt-1">Fare: ₹{b.total_fare}</p>
//                   <p className="text-sm">
//                     Passengers: {b.passengers.map((p) => `${p.name} (Seat ${p.trip_seat})`).join(', ')}
//                   </p>
//                 </div>
//                 {b.status === 'CONFIRMED' && (
//                   <button
//                     onClick={() => handleCancel(b.booking_id)}
//                     className="text-red-500 border border-red-500 px-3 py-1 rounded text-sm hover:bg-red-50"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;
import { useEffect, useState } from 'react';
import { getMyBookings, cancelBooking } from '../api/bookings';
import BookingDetailsModal from '../components/BookingDetailsModal';

const STATUS_STYLES = {
  CONFIRMED: 'bg-emerald-50 text-emerald-600',
  PENDING: 'bg-amber-50 text-amber-600',
  CANCELLED: 'bg-red-50 text-red-500',
};

const formatDateTime = (dt) =>
  new Date(dt).toLocaleString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = () => {
    setLoading(true);
    getMyBookings().then((res) => setBookings(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!confirm('Cancel this booking? This action cannot be undone.')) return;
    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 pb-16">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">My Bookings</h2>
      <p className="text-slate-500 text-sm mb-6">View and manage your bus tickets</p>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-slate-100 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-orange-400">
              <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 10h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1.5">No bookings yet</h3>
          <p className="text-sm text-slate-500">Your booked trips will show up here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              {/* Top strip */}
              <div className="flex justify-between items-center px-5 py-3 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">BOOKING ID</span>
                  <span className="text-xs font-mono text-slate-600">{b.booking_id.slice(0, 8).toUpperCase()}</span>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[b.status] || 'bg-slate-100 text-slate-500'}`}>
                  {b.status}
                </span>
              </div>

              <div className="p-5">
                {b.trip && (
                  <>
                    <div className="flex items-center gap-2 text-slate-800 font-semibold mb-1">
                      <span>{b.trip.route?.source}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-400">
                        <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{b.trip.route?.destination}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">
                      {b.trip.bus?.name} · Departs {formatDateTime(b.trip.departure_datetime)}
                    </p>
                  </>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {b.passengers.map((p) => (
                    <span key={p.id} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                      {p.name} · Seat {p.seat_number}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400">Total Fare</p>
                    <p className="text-lg font-bold text-slate-800">₹{b.total_fare}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                      View Details
                    </button>
                    {b.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleCancel(b.booking_id)}
                        disabled={cancellingId === b.booking_id}
                        className="text-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {cancellingId === b.booking_id ? 'Cancelling...' : 'Cancel Booking'}
                      </button>
                    )}
                  </div>
                  {/* {b.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCancel(b.booking_id)}
                      disabled={cancellingId === b.booking_id}
                      className="text-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {cancellingId === b.booking_id ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    {/* </div>
  ); */}
  <BookingDetailsModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

export default MyBookings;