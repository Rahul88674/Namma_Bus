import Modal from './Modal';

const STATUS_STYLES = {
  CONFIRMED: 'bg-emerald-50 text-emerald-600',
  PENDING: 'bg-amber-50 text-amber-600',
  CANCELLED: 'bg-red-50 text-red-500',
};

const GENDER_LABELS = { M: 'Male', F: 'Female', O: 'Other' };

const formatDateTime = (dt) =>
  new Date(dt).toLocaleString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const BookingDetailsModal = ({ booking, isOpen, onClose }) => {
  if (!booking) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details">
      <div className="flex flex-col gap-5">
        {/* Header info */}
        {/* <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">BOOKING ID</p>
            <p className="font-mono text-sm text-slate-700">{booking.booking_id}</p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[booking.status] || 'bg-slate-100 text-slate-500'}`}>
            {booking.status}
          </span>
        </div> */}

        {/* Trip info */}
        {booking.trip && (
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold mb-2">
              <span>{booking.trip.route?.source}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-400">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{booking.trip.route?.destination}</span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[booking.status] || 'bg-slate-100 text-slate-500'}`}>
            {booking.status}
          </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-400">Bus</p>
                <p className="text-slate-700 font-medium">{booking.trip.bus?.name}</p>
                <p className="text-xs text-slate-400 font-mono">{booking.trip.bus?.bus_number}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Bus Type</p>
                <p className="text-slate-700 font-medium">{booking.trip.bus?.bus_type?.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Departure</p>
                <p className="text-slate-700 font-medium">{formatDateTime(booking.trip.departure_datetime)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Arrival</p>
                <p className="text-slate-700 font-medium">{formatDateTime(booking.trip.arrival_datetime)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Passenger details */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Passengers ({booking.passengers.length})
          </p>
          <div className="flex flex-col gap-2">
            {booking.passengers.map((p) => (
              <div key={p.id} className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-400">
                    {p.age} yrs · {GENDER_LABELS[p.gender] || p.gender}
                  </p>
                </div>
                <span className="text-xs bg-orange-50 text-orange-600 font-semibold px-3 py-1 rounded-full">
                  Seat {p.seat_number}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fare summary */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-sm text-slate-500">Total Fare</span>
          <span className="text-xl font-bold text-slate-800">₹{booking.total_fare}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>Booked on</span>
          <span>{formatDateTime(booking.created_at)}</span>
        </div>
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;