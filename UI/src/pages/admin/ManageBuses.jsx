// import { useEffect, useState } from 'react';
// import { getBuses, createBus, updateBus, deleteBus, bulkCreateSeats } from '../../api/buses';
// import Modal from '../../components/Modal';

// const BUS_TYPES = ['AC_SEATER', 'NON_AC_SEATER', 'AC_SLEEPER', 'NON_AC_SLEEPER'];

// const emptyForm = { name: '', bus_number: '', bus_type: 'AC_SEATER', total_seats: '', amenities: '', is_active: true };

// const ManageBuses = () => {
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [seatModalOpen, setSeatModalOpen] = useState(false);
//   const [editingBus, setEditingBus] = useState(null);
//   const [form, setForm] = useState(emptyForm);
//   const [error, setError] = useState('');

//   // seat layout builder state
//   const [selectedBusForSeats, setSelectedBusForSeats] = useState(null);
//   const [seatConfig, setSeatConfig] = useState({ lowerRows: 5, upperRows: 5, hasUpper: true });

//   const fetchBuses = () => {
//     setLoading(true);
//     getBuses().then((res) => setBuses(res.data)).finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   const openAddModal = () => {
//     setEditingBus(null);
//     setForm(emptyForm);
//     setError('');
//     setModalOpen(true);
//   };

//   const openEditModal = (bus) => {
//     setEditingBus(bus);
//     setForm({
//       name: bus.name,
//       bus_number: bus.bus_number,
//       bus_type: bus.bus_type,
//       total_seats: bus.total_seats,
//       amenities: bus.amenities || '',
//       is_active: bus.is_active,
//     });
//     setError('');
//     setModalOpen(true);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const payload = { ...form, total_seats: parseInt(form.total_seats) };
//       if (editingBus) {
//         await updateBus(editingBus.id, payload);
//       } else {
//         await createBus(payload);
//       }
//       setModalOpen(false);
//       fetchBuses();
//     } catch (err) {
//       setError(err.response?.data ? JSON.stringify(err.response.data) : 'Something went wrong');
//     }
//   };

//   const handleDelete = async (bus) => {
//     if (!confirm(`Delete bus "${bus.name}"? This cannot be undone.`)) return;
//     try {
//       await deleteBus(bus.id);
//       fetchBuses();
//     } catch (err) {
//       alert('Could not delete bus. It may have existing trips.');
//     }
//   };

//   const openSeatModal = (bus) => {
//     setSelectedBusForSeats(bus);
//     setSeatConfig({ lowerRows: 5, upperRows: 5, hasUpper: true });
//     setError('');
//     setSeatModalOpen(true);
//   };

//   // generates seat layout: each row = 1 single + 2 double (3 seats/row), pattern matches SeatMap grouping
//   const generateSeats = () => {
//     const seats = [];
//     for (let r = 1; r <= parseInt(seatConfig.lowerRows); r++) {
//       const base = (r - 1) * 3;
//       seats.push({ seat_number: `L${base + 1}`, seat_type: 'SLEEPER', deck: 'LOWER' });
//       seats.push({ seat_number: `L${base + 2}`, seat_type: 'SLEEPER', deck: 'LOWER' });
//       seats.push({ seat_number: `L${base + 3}`, seat_type: 'SLEEPER', deck: 'LOWER' });
//     }
//     if (seatConfig.hasUpper) {
//       for (let r = 1; r <= parseInt(seatConfig.upperRows); r++) {
//         const base = (r - 1) * 3;
//         seats.push({ seat_number: `U${base + 1}`, seat_type: 'SLEEPER', deck: 'UPPER' });
//         seats.push({ seat_number: `U${base + 2}`, seat_type: 'SLEEPER', deck: 'UPPER' });
//         seats.push({ seat_number: `U${base + 3}`, seat_type: 'SLEEPER', deck: 'UPPER' });
//       }
//     }
//     return seats;
//   };

//   const handleGenerateSeats = async () => {
//     setError('');
//     try {
//       const seats = generateSeats();
//       await bulkCreateSeats(selectedBusForSeats.id, seats);
//       await updateBus(selectedBusForSeats.id, { total_seats: seats.length });
//       setSeatModalOpen(false);
//       fetchBuses();
//     } catch (err) {
//       setError('Could not generate seats. ' + (err.response?.data?.error || ''));
//     }
//   };

//   if (loading) return <div>Loading buses...</div>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Manage Buses</h2>
//         <button onClick={openAddModal} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm">
//           + Add Bus
//         </button>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-slate-50 text-slate-500 text-left">
//             <tr>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Number</th>
//               <th className="px-4 py-3">Type</th>
//               <th className="px-4 py-3">Seats</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {buses.map((bus) => (
//               <tr key={bus.id} className="border-t">
//                 <td className="px-4 py-3">{bus.name}</td>
//                 <td className="px-4 py-3">{bus.bus_number}</td>
//                 <td className="px-4 py-3">{bus.bus_type}</td>
//                 <td className="px-4 py-3">{bus.seats?.length || 0} / {bus.total_seats}</td>
//                 <td className="px-4 py-3">
//                   <span className={bus.is_active ? 'text-green-600' : 'text-slate-400'}>
//                     {bus.is_active ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 flex gap-2">
//                   <button onClick={() => openEditModal(bus)} className="text-blue-500 hover:underline">Edit</button>
//                   <button onClick={() => openSeatModal(bus)} className="text-emerald-600 hover:underline">Seats</button>
//                   <button onClick={() => handleDelete(bus)} className="text-red-500 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {buses.length === 0 && (
//               <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-400">No buses yet.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBus ? 'Edit Bus' : 'Add Bus'}>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           {error && <p className="text-red-500 text-xs">{error}</p>}
//           <input name="name" placeholder="Bus Name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
//           <input name="bus_number" placeholder="Bus Number (e.g. KA01AB1234)" value={form.bus_number} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
//           <select name="bus_type" value={form.bus_type} onChange={handleChange} className="border rounded px-3 py-2 text-sm">
//             {BUS_TYPES.map((t) => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
//           </select>
//           <input name="total_seats" type="number" placeholder="Total Seats" value={form.total_seats} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
//           <input name="amenities" placeholder="Amenities (comma separated)" value={form.amenities} onChange={handleChange} className="border rounded px-3 py-2 text-sm" />
//           <label className="flex items-center gap-2 text-sm">
//             <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
//             Active
//           </label>
//           <button type="submit" className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 text-sm mt-2">
//             {editingBus ? 'Save Changes' : 'Create Bus'}
//           </button>
//         </form>
//       </Modal>

//       <Modal isOpen={seatModalOpen} onClose={() => setSeatModalOpen(false)} title={`Generate Seat Layout — ${selectedBusForSeats?.name || ''}`}>
//         <div className="flex flex-col gap-3">
//           {error && <p className="text-red-500 text-xs">{error}</p>}
//           <p className="text-xs text-slate-500">Each row has 3 seats (1 single + 2 double), matching sleeper layout. This will replace any existing seats for this bus.</p>
//           <label className="text-sm">
//             Lower deck rows
//             <input
//               type="number"
//               value={seatConfig.lowerRows}
//               onChange={(e) => setSeatConfig({ ...seatConfig, lowerRows: e.target.value })}
//               className="border rounded px-3 py-2 text-sm w-full mt-1"
//             />
//           </label>
//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={seatConfig.hasUpper}
//               onChange={(e) => setSeatConfig({ ...seatConfig, hasUpper: e.target.checked })}
//             />
//             Has upper deck
//           </label>
//           {seatConfig.hasUpper && (
//             <label className="text-sm">
//               Upper deck rows
//               <input
//                 type="number"
//                 value={seatConfig.upperRows}
//                 onChange={(e) => setSeatConfig({ ...seatConfig, upperRows: e.target.value })}
//                 className="border rounded px-3 py-2 text-sm w-full mt-1"
//               />
//             </label>
//           )}
//           <p className="text-sm font-medium">
//             Total seats: {parseInt(seatConfig.lowerRows || 0) * 3 + (seatConfig.hasUpper ? parseInt(seatConfig.upperRows || 0) * 3 : 0)}
//           </p>
//           <button onClick={handleGenerateSeats} className="bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 text-sm">
//             Generate Seats
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ManageBuses;
import { useEffect, useState } from 'react';
import { getBuses, createBus, updateBus, deleteBus, bulkCreateSeats } from '../../api/buses';
import Modal from '../../components/Modal';

const BUS_TYPES = ['AC_SEATER', 'NON_AC_SEATER', 'AC_SLEEPER', 'NON_AC_SLEEPER'];
const BUS_TYPE_LABELS = {
  AC_SEATER: 'AC Seater',
  NON_AC_SEATER: 'Non-AC Seater',
  AC_SLEEPER: 'AC Sleeper',
  NON_AC_SLEEPER: 'Non-AC Sleeper',
};

const emptyForm = { name: '', bus_number: '', bus_type: 'AC_SEATER', total_seats: '', amenities: '', is_active: true };

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [selectedBusForSeats, setSelectedBusForSeats] = useState(null);
  const [seatConfig, setSeatConfig] = useState({ lowerRows: 5, upperRows: 5, hasUpper: true });

  const fetchBuses = () => {
    setLoading(true);
    getBuses().then((res) => setBuses(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const openAddModal = () => {
    setEditingBus(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (bus) => {
    setEditingBus(bus);
    setForm({
      name: bus.name,
      bus_number: bus.bus_number,
      bus_type: bus.bus_type,
      total_seats: bus.total_seats,
      amenities: bus.amenities || '',
      is_active: bus.is_active,
    });
    setError('');
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = { ...form, total_seats: parseInt(form.total_seats) };
      if (editingBus) {
        await updateBus(editingBus.id, payload);
      } else {
        await createBus(payload);
      }
      setModalOpen(false);
      fetchBuses();
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (bus) => {
    if (!confirm(`Delete bus "${bus.name}"? This cannot be undone.`)) return;
    try {
      await deleteBus(bus.id);
      fetchBuses();
    } catch (err) {
      alert('Could not delete bus. It may have existing trips.');
    }
  };

  const openSeatModal = (bus) => {
    setSelectedBusForSeats(bus);
    setSeatConfig({ lowerRows: 5, upperRows: 5, hasUpper: bus.bus_type.includes('SLEEPER') });
    setError('');
    setSeatModalOpen(true);
  };

  const isSleeperBus = selectedBusForSeats?.bus_type?.includes('SLEEPER');

  // Sleeper: 1 single + 2 double (3/row). Seater: 2 left + 2 right (4/row).
  const generateSeats = () => {
    const seats = [];
    const perRow = isSleeperBus ? 3 : 4;

    for (let r = 1; r <= parseInt(seatConfig.lowerRows || 0); r++) {
      const base = (r - 1) * perRow;
      for (let s = 1; s <= perRow; s++) {
        seats.push({ seat_number: `L${base + s}`, seat_type: isSleeperBus ? 'SLEEPER' : 'SEATER', deck: 'LOWER' });
      }
    }
    if (seatConfig.hasUpper) {
      for (let r = 1; r <= parseInt(seatConfig.upperRows || 0); r++) {
        const base = (r - 1) * perRow;
        for (let s = 1; s <= perRow; s++) {
          seats.push({ seat_number: `U${base + s}`, seat_type: isSleeperBus ? 'SLEEPER' : 'SEATER', deck: 'UPPER' });
        }
      }
    }
    return seats;
  };

  const handleGenerateSeats = async () => {
    setError('');
    setSubmitting(true);
    try {
      const seats = generateSeats();
      await bulkCreateSeats(selectedBusForSeats.id, seats);
      await updateBus(selectedBusForSeats.id, { total_seats: seats.length });
      setSeatModalOpen(false);
      fetchBuses();
    } catch (err) {
      setError('Could not generate seats. ' + (err.response?.data?.error || ''));
    } finally {
      setSubmitting(false);
    }
  };

  const perRowPreview = isSleeperBus ? 3 : 4;
  const totalSeatsPreview =
    parseInt(seatConfig.lowerRows || 0) * perRowPreview +
    (seatConfig.hasUpper ? parseInt(seatConfig.upperRows || 0) * perRowPreview : 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Buses</h2>
          <p className="text-slate-500 text-sm mt-0.5">{buses.length} buses registered</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-orange-200 transition-all flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          Add Bus
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Bus</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Seats</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => {
                const seatsGenerated = bus.seats?.length || 0;
                const seatsMatch = seatsGenerated === bus.total_seats && seatsGenerated > 0;

                return (
                  <tr key={bus.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">{bus.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{bus.bus_number}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                        {BUS_TYPE_LABELS[bus.bus_type] || bus.bus_type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-medium ${seatsMatch ? 'text-slate-700' : 'text-amber-600'}`}>
                        {seatsGenerated} / {bus.total_seats}
                      </span>
                      {!seatsMatch && (
                        <p className="text-[11px] text-amber-500">Seats not generated</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${bus.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${bus.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                        {bus.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3 text-xs font-medium">
                        <button onClick={() => openEditModal(bus)} className="text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => openSeatModal(bus)} className="text-emerald-600 hover:underline">Seats</button>
                        <button onClick={() => handleDelete(bus)} className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {buses.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-slate-400">
                    No buses yet. Click "Add Bus" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Bus Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBus ? 'Edit Bus' : 'Add New Bus'}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>
          )}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Bus Name</label>
            <input name="name" placeholder="e.g. Ambaari Utsav" value={form.name} onChange={handleChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Bus Number</label>
            <input name="bus_number" placeholder="e.g. KA01AB1234" value={form.bus_number} onChange={handleChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Bus Type</label>
            <select name="bus_type" value={form.bus_type} onChange={handleChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent">
              {BUS_TYPES.map((t) => <option key={t} value={t}>{BUS_TYPE_LABELS[t]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Total Seats</label>
            <input name="total_seats" type="number" placeholder="e.g. 30" value={form.total_seats} onChange={handleChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Amenities</label>
            <input name="amenities" placeholder="WiFi, Charging Point, Blanket" value={form.amenities} onChange={handleChange} className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="accent-orange-500" />
            Active (visible for bookings)
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-md transition-all disabled:opacity-50 mt-1"
          >
            {submitting ? 'Saving...' : editingBus ? 'Save Changes' : 'Create Bus'}
          </button>
        </form>
      </Modal>

      {/* Seat Layout Modal */}
      <Modal isOpen={seatModalOpen} onClose={() => setSeatModalOpen(false)} title={`Seat Layout — ${selectedBusForSeats?.name || ''}`}>
        <div className="flex flex-col gap-3.5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-600">
            {isSleeperBus ? (
              <>Sleeper layout: each row has <strong>3 seats</strong> (1 single + 2 double berths).</>
            ) : (
              <>Seater layout: each row has <strong>4 seats</strong> (2 left + 2 right, aisle in between).</>
            )}
            {' '}This will replace any existing seats for this bus.
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Lower deck rows</label>
            <input
              type="number"
              value={seatConfig.lowerRows}
              onChange={(e) => setSeatConfig({ ...seatConfig, lowerRows: e.target.value })}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={seatConfig.hasUpper}
              onChange={(e) => setSeatConfig({ ...seatConfig, hasUpper: e.target.checked })}
              className="accent-orange-500"
            />
            Has upper deck
          </label>

          {seatConfig.hasUpper && (
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Upper deck rows</label>
              <input
                type="number"
                value={seatConfig.upperRows}
                onChange={(e) => setSeatConfig({ ...seatConfig, upperRows: e.target.value })}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
          )}

          <div className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs text-orange-700 font-medium">Total seats to generate</span>
            <span className="text-lg font-bold text-orange-600">{totalSeatsPreview}</span>
          </div>

          <button
            onClick={handleGenerateSeats}
            disabled={submitting}
            className="bg-emerald-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Generating...' : 'Generate Seats'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageBuses;