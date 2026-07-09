import { useEffect, useState } from 'react';
import { getRoutes, createRoute, updateRoute, deleteRoute } from '../../api/routes';
import Modal from '../../components/Modal';

const emptyForm = { source: '', destination: '', distance_km: '', duration: '' };

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const fetchRoutes = () => {
    setLoading(true);
    getRoutes().then((res) => setRoutes(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const openAddModal = () => {
    setEditingRoute(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (route) => {
    setEditingRoute(route);
    setForm({
      source: route.source,
      destination: route.destination,
      distance_km: route.distance_km || '',
      duration: route.duration || '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingRoute) {
        await updateRoute(editingRoute.id, form);
      } else {
        await createRoute(form);
      }
      setModalOpen(false);
      fetchRoutes();
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Something went wrong');
    }
  };

  const handleDelete = async (route) => {
    if (!confirm(`Delete route "${route.source} → ${route.destination}"?`)) return;
    try {
      await deleteRoute(route.id);
      fetchRoutes();
    } catch (err) {
      alert('Could not delete route. It may have existing trips.');
    }
  };

  if (loading) return <div>Loading routes...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Routes</h2>
        <button onClick={openAddModal} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm">
          + Add Route
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Distance (km)</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="border-t">
                <td className="px-4 py-3">{route.source}</td>
                <td className="px-4 py-3">{route.destination}</td>
                <td className="px-4 py-3">{route.distance_km || '-'}</td>
                <td className="px-4 py-3">{route.duration}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEditModal(route)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(route)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {routes.length === 0 && (
              <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-400">No routes yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingRoute ? 'Edit Route' : 'Add Route'}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <input name="source" placeholder="Source city" value={form.source} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
          <input name="destination" placeholder="Destination city" value={form.destination} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
          <input name="distance_km" type="number" step="0.01" placeholder="Distance (km)" value={form.distance_km} onChange={handleChange} className="border rounded px-3 py-2 text-sm" />
          <input name="duration" placeholder="Duration (HH:MM:SS e.g. 05:30:00)" value={form.duration} onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
          <button type="submit" className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 text-sm mt-2">
            {editingRoute ? 'Save Changes' : 'Create Route'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageRoutes;