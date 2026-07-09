// import api from './axios';

// export const getBuses = () => api.get('/buses/');
// export const createBus = (data) => api.post('/buses/', data);
// export const updateBus = (id, data) => api.patch(`/buses/${id}/`, data);
// export const deleteBus = (id) => api.delete(`/buses/${id}/`);

import api from './axios';

export const getBuses = () => api.get('/buses/');
export const getBusById = (id) => api.get(`/buses/${id}/`);
export const createBus = (data) => api.post('/buses/', data);
export const updateBus = (id, data) => api.patch(`/buses/${id}/`, data);
export const deleteBus = (id) => api.delete(`/buses/${id}/`);
export const bulkCreateSeats = (busId, seats) => api.post(`/buses/${busId}/seats/bulk-create/`, { seats });