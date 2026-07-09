// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getTripSeats, lockSeat, createBooking } from '../api/bookings';
// import { getTripById } from '../api/routes';
// import SeatMap from '../components/SeatMap';
// import { useAuth } from '../context/AuthContext';

// const TripDetail = () => {
//   const { tripId } = useParams();
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   const [trip, setTrip] = useState(null);
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengers, setPassengers] = useState({});
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [lockingSeatId, setLockingSeatId] = useState(null);

//   const fetchSeats = () => {
//     getTripSeats(tripId).then((res) => setSeats(res.data));
//   };

//   useEffect(() => {
//     getTripById(tripId).then((res) => setTrip(res.data));
//     fetchSeats();
//   }, [tripId]);

//   const handleSeatClick = async (seat) => {
//     if (authLoading) return; // auth not ready yet, ignore click
//     if (lockingSeatId) return; // a lock request is already in flight, ignore extra clicks

//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     // deselect
//     if (selectedSeats.includes(seat.id)) {
//       setSelectedSeats((prev) => prev.filter((id) => id !== seat.id));
//       setPassengers((prev) => {
//         const updated = { ...prev };
//         delete updated[seat.id];
//         return updated;
//       });
//       return;
//     }

//     setError('');
//     setLockingSeatId(seat.id);
//     try {
//       await lockSeat(seat.id);
//       setSelectedSeats((prev) => [...prev, seat.id]);
//       setPassengers((prev) => ({ ...prev, [seat.id]: { name: '', age: '', gender: 'M' } }));
//       fetchSeats();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Could not lock seat, it may already be taken.');
//       fetchSeats();
//     } finally {
//       setLockingSeatId(null);
//     }
//   };

//   const handlePassengerChange = (seatId, field, value) => {
//     setPassengers((prev) => ({
//       ...prev,
//       [seatId]: { ...prev[seatId], [field]: value },
//     }));
//   };

//   const handleBooking = async () => {
//     setError('');
//     setSubmitting(true);
//     try {
//       const passengerList = selectedSeats.map((seatId) => ({
//         trip_seat_id: seatId,
//         name: passengers[seatId].name,
//         age: passengers[seatId].age,
//         gender: passengers[seatId].gender,
//       }));

//       await createBooking({ trip_id: tripId, passengers: passengerList });
//       navigate('/my-bookings');
//     } catch (err) {
//       setError(err.response?.data?.[0] || 'Booking failed. Try again.');
//       fetchSeats();
//       setSelectedSeats([]);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-8 px-4">
//       <h2 className="text-xl font-semibold mb-1">Select Your Seats</h2>
//       {trip && (
//         <p className="text-sm text-slate-500 mb-6">
//           {trip.bus.name} · {trip.route.source} → {trip.route.destination} ·{' '}
//           {new Date(trip.departure_datetime).toLocaleString()}
//         </p>
//       )}
//       {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="flex-[2]">
//           {/* <SeatMap
//             seats={seats}
//             selectedSeats={selectedSeats}
//             lockingSeatId={lockingSeatId}
//             onSeatClick={handleSeatClick}
//             fare={trip?.fare}
//           /> */}
//           <SeatMap
//   seats={seats}
//   selectedSeats={selectedSeats}
//   lockingSeatId={lockingSeatId}
//   onSeatClick={handleSeatClick}
//   fare={trip?.fare}
//   busType={trip?.bus?.bus_type}
// />
//         </div>

//         {selectedSeats.length > 0 && (
//           <div className="flex-1 bg-white shadow rounded-lg p-4 h-fit">
//             <h3 className="font-semibold mb-4">Passenger Details</h3>
//             {selectedSeats.map((seatId) => {
//               const seat = seats.find((s) => s.id === seatId);
//               return (
//                 <div key={seatId} className="mb-4 border-b pb-3">
//                   <p className="text-sm font-medium mb-2">Seat {seat?.seat_number}</p>
//                   <input
//                     placeholder="Name"
//                     value={passengers[seatId]?.name || ''}
//                     onChange={(e) => handlePassengerChange(seatId, 'name', e.target.value)}
//                     className="border rounded px-2 py-1 w-full mb-2 text-sm"
//                   />
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       placeholder="Age"
//                       value={passengers[seatId]?.age || ''}
//                       onChange={(e) => handlePassengerChange(seatId, 'age', e.target.value)}
//                       className="border rounded px-2 py-1 w-20 text-sm"
//                     />
//                     <select
//                       value={passengers[seatId]?.gender || 'M'}
//                       onChange={(e) => handlePassengerChange(seatId, 'gender', e.target.value)}
//                       className="border rounded px-2 py-1 text-sm"
//                     >
//                       <option value="M">Male</option>
//                       <option value="F">Female</option>
//                       <option value="O">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               );
//             })}
//             <button
//               onClick={handleBooking}
//               disabled={submitting}
//               className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:opacity-50"
//             >
//               {submitting ? 'Booking...' : `Confirm Booking · ₹${(trip?.fare || 0) * selectedSeats.length}`}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TripDetail;
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripSeats, lockSeat, createBooking } from '../api/bookings';
import { getTripById } from '../api/routes';
import SeatMap from '../components/SeatMap';
import { useAuth } from '../context/AuthContext';

const BUS_TYPE_LABELS = {
  AC_SEATER: 'AC Seater',
  NON_AC_SEATER: 'Non-AC Seater',
  AC_SLEEPER: 'AC Sleeper',
  NON_AC_SLEEPER: 'Non-AC Sleeper',
};

const StepIndicator = ({ step }) => {
  const steps = [
    { num: 1, label: 'Select Seats' },
    { num: 2, label: 'Passenger Details' },
    { num: 3, label: 'Confirmation' },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((s, idx) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step > s.num
                  ? 'bg-emerald-500 text-white'
                  : step === s.num
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > s.num ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                s.num
              )}
            </div>
            <span className={`text-xs mt-1.5 font-medium ${step >= s.num ? 'text-slate-700' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-16 md:w-24 h-0.5 mx-2 mb-5 ${step > s.num ? 'bg-emerald-400' : 'bg-slate-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

const TripDetail = () => {
  const { tripId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [trip, setTrip] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [lockingSeatId, setLockingSeatId] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const fetchSeats = () => {
    getTripSeats(tripId).then((res) => setSeats(res.data));
  };

  useEffect(() => {
    getTripById(tripId).then((res) => setTrip(res.data));
    fetchSeats();
  }, [tripId]);

  const handleSeatClick = async (seat) => {
    if (authLoading) return;
    if (lockingSeatId) return;

    if (!user) {
      navigate('/login');
      return;
    }

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seat.id));
      setPassengers((prev) => {
        const updated = { ...prev };
        delete updated[seat.id];
        return updated;
      });
      return;
    }

    setError('');
    setLockingSeatId(seat.id);
    try {
      await lockSeat(seat.id);
      setSelectedSeats((prev) => [...prev, seat.id]);
      setPassengers((prev) => ({ ...prev, [seat.id]: { name: '', age: '', gender: 'M' } }));
      fetchSeats();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not lock seat, it may already be taken.');
      fetchSeats();
    } finally {
      setLockingSeatId(null);
    }
  };

  const handlePassengerChange = (seatId, field, value) => {
    setPassengers((prev) => ({
      ...prev,
      [seatId]: { ...prev[seatId], [field]: value },
    }));
  };

  const goToPassengerStep = () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat to continue.');
      return;
    }
    setError('');
    setStep(2);
  };

  const validatePassengers = () => {
    for (const seatId of selectedSeats) {
      const p = passengers[seatId];
      if (!p?.name?.trim()) return 'Please enter a name for all passengers.';
      if (!p?.age || p.age <= 0 || p.age > 120) return 'Please enter a valid age for all passengers.';
    }
    return null;
  };

  const handleBooking = async () => {
    const validationError = validatePassengers();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const passengerList = selectedSeats.map((seatId) => ({
        trip_seat_id: seatId,
        name: passengers[seatId].name,
        age: passengers[seatId].age,
        gender: passengers[seatId].gender,
      }));

      const res = await createBooking({ trip_id: tripId, passengers: passengerList });
      setConfirmedBooking(res.data);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.[0] || 'Booking failed. Try again.');
      fetchSeats();
    } finally {
      setSubmitting(false);
    }
  };

  const totalFare = (trip?.fare || 0) * selectedSeats.length;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-16">
      <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center">Book Your Trip</h2>
      {trip && (
        <p className="text-sm text-slate-500 mb-6 text-center">
          {trip.bus.name} ({BUS_TYPE_LABELS[trip.bus.bus_type]}) · {trip.route.source} → {trip.route.destination} ·{' '}
          {new Date(trip.departure_datetime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </p>
      )}

      <StepIndicator step={step} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5 max-w-xl mx-auto">
          {error}
        </div>
      )}

      {/* Step 1: Seat Selection */}
      {step === 1 && (
        <div>
          <div className="flex justify-center">
            <SeatMap
              seats={seats}
              selectedSeats={selectedSeats}
              lockingSeatId={lockingSeatId}
              onSeatClick={handleSeatClick}
              fare={trip?.fare}
              busType={trip?.bus?.bus_type}
            />
          </div>

          <div className="max-w-xl mx-auto mt-8 bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Selected Seats</p>
              <p className="font-semibold text-slate-800">
                {selectedSeats.length > 0
                  ? selectedSeats.map((id) => seats.find((s) => s.id === id)?.seat_number).join(', ')
                  : 'None yet'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Total Fare</p>
              <p className="text-xl font-bold text-orange-500">₹{totalFare}</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={goToPassengerStep}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-10 py-3 rounded-lg hover:shadow-lg hover:shadow-orange-200 transition-all"
            >
              Continue to Passenger Details
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Passenger Details */}
      {step === 2 && (
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Enter Passenger Details</h3>
            <div className="flex flex-col gap-4">
              {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <div key={seatId} className="border border-slate-200 rounded-lg p-4">
                    <span className="inline-block text-xs bg-orange-50 text-orange-600 font-semibold px-2.5 py-1 rounded-full mb-3">
                      Seat {seat?.seat_number}
                    </span>
                    <input
                      placeholder="Full name"
                      value={passengers[seatId]?.name || ''}
                      onChange={(e) => handlePassengerChange(seatId, 'name', e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-2 w-full mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="Age"
                        value={passengers[seatId]?.age || ''}
                        onChange={(e) => handlePassengerChange(seatId, 'age', e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-2 w-24 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                      <select
                        value={passengers[seatId]?.gender || 'M'}
                        onChange={(e) => handlePassengerChange(seatId, 'gender', e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500">Total Fare</span>
              <span className="text-xl font-bold text-slate-800">₹{totalFare}</span>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="text-slate-500 font-medium px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ← Back to Seats
            </button>
            <button
              onClick={handleBooking}
              disabled={submitting}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-10 py-3 rounded-lg hover:shadow-lg hover:shadow-orange-200 transition-all disabled:opacity-50"
            >
              {submitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && confirmedBooking && (
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">Booking Confirmed!</h3>
          <p className="text-slate-500 text-sm mb-6">
            Booking ID: <span className="font-mono">{confirmedBooking.booking_id}</span>
          </p>

          <div className="bg-white border border-slate-200 rounded-xl p-6 text-left mb-6">
            <div className="flex items-center gap-2 text-slate-800 font-semibold mb-3">
              <span>{trip?.route?.source}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-400">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{trip?.route?.destination}</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              {trip?.bus.name} · {new Date(trip?.departure_datetime).toLocaleString()}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {confirmedBooking.passengers?.map((p) => (
                <span key={p.id} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                  {p.name} · Seat {p.seat_number}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-sm text-slate-500">Total Paid</span>
              <span className="text-lg font-bold text-slate-800">₹{confirmedBooking.total_fare}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-10 py-3 rounded-lg hover:shadow-lg hover:shadow-orange-200 transition-all"
          >
            View My Bookings
          </button>
        </div>
      )}
    </div>
  );
};

export default TripDetail;