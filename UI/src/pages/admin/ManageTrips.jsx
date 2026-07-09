import { useEffect, useState } from 'react';
import { getTrips, createTrip, updateTrip, deleteTrip } from '../../api/routes';
import { getBuses } from '../../api/buses';
import { getRoutes } from '../../api/routes';
import Modal from '../../components/Modal';

const emptyForm = { bus: '', route: '', departure_datetime: '', arrival_datetime: '', fare: '', is_active: true };

const ManageTrips = () => {
  const [trips, setTrips] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const fetchAll = () => {
    setLoading(true);
    Promise.all([getTrips(), getBuses(), getRoutes()])
      .then(([tripsRes, busesRes, routesRes]) => {
        setTrips(tripsRes.data);
        setBuses(busesRes.data);
        setRoutes(routesRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openAddModal = () => {
    setEditingTrip(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (trip) => {
    setEditingTrip(trip);
    setForm({
      bus: trip.bus.id,
      route: trip.route.id,
      departure_datetime: trip.departure_datetime.slice(0, 16),
      arrival_datetime: trip.arrival_datetime.slice(0, 16),
      fare: trip.fare,
      is_active: trip.is_active,
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

    if (new Date(form.departure_datetime) < new Date()) {
      setError('Departure time cannot be in the past.');
      return;
    }
    if (new Date(form.arrival_datetime) <= new Date(form.departure_datetime)) {
      setError('Arrival time must be after departure time.');
      return;
    }

    try {
      const payload = { ...form, bus: parseInt(form.bus), route: parseInt(form.route), fare: parseFloat(form.fare) };
      if (editingTrip) {
        await updateTrip(editingTrip.id, payload);
      } else {
        await createTrip(payload);
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Something went wrong');
    }
  };

  const handleDelete = async (trip) => {
    if (!confirm('Delete this trip? Existing bookings for it will be affected.')) return;
    try {
      await deleteTrip(trip.id);
      fetchAll();
    } catch (err) {
      alert('Could not delete trip.');
    }
  };

  if (loading) return <div>Loading trips...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Trips</h2>
        <button onClick={openAddModal} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm">
          + Add Trip
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3">Bus</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Departure</th>
              <th className="px-4 py-3">Fare</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-t">
                <td className="px-4 py-3">{trip.bus.name}</td>
                <td className="px-4 py-3">{trip.route.source} → {trip.route.destination}</td>
                <td className="px-4 py-3">{new Date(trip.departure_datetime).toLocaleString()}</td>
                <td className="px-4 py-3">₹{trip.fare}</td>
                <td className="px-4 py-3">
                  <span className={trip.is_active ? 'text-green-600' : 'text-slate-400'}>
                    {trip.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEditModal(trip)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(trip)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {trips.length === 0 && (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-400">No trips yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingTrip ? 'Edit Trip' : 'Add Trip'}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <select name="bus" value={form.bus} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
            <option value="">Select Bus</option>
            {buses.map((b) => <option key={b.id} value={b.id}>{b.name} ({b.bus_number})</option>)}
          </select>
          <select name="route" value={form.route} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
            <option value="">Select Route</option>
            {routes.map((r) => <option key={r.id} value={r.id}>{r.source} → {r.destination}</option>)}
          </select>
          <label className="text-sm">
            Departure
            <input type="datetime-local" name="departure_datetime" value={form.departure_datetime} onChange={handleChange} className="border rounded px-3 py-2 text-sm w-full mt-1" required />
          </label>
          <label className="text-sm">
            Arrival
            <input type="datetime-local" name="arrival_datetime" value={form.arrival_datetime} onChange={handleChange} className="border rounded px-3 py-2 text-sm w-full mt-1" required />
          </label>
          <input name="fare" type="number" step="0.01" placeholder="Fare (₹)" value={form.fare} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
            Active
          </label>
          <button type="submit" className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 text-sm mt-2">
            {editingTrip ? 'Save Changes' : 'Create Trip'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageTrips;