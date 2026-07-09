// import api from './axios';

// export const searchTrips = (params) => api.get('/routes/search/', { params });
// export const getRoutes = () => api.get('/routes/routes/');
// export const createRoute = (data) => api.post('/routes/routes/', data);
// export const getTrips = () => api.get('/routes/trips/');
// export const createTrip = (data) => api.post('/routes/trips/', data);
// export const getTripById = (id) => api.get(`/routes/trips/${id}/`);
import api from './axios';

export const searchTrips = (params) => api.get('/routes/search/', { params });

export const getRoutes = () => api.get('/routes/routes/');
export const createRoute = (data) => api.post('/routes/routes/', data);
export const updateRoute = (id, data) => api.patch(`/routes/routes/${id}/`, data);
export const deleteRoute = (id) => api.delete(`/routes/routes/${id}/`);

export const getTrips = () => api.get('/routes/trips/');
export const getTripById = (id) => api.get(`/routes/trips/${id}/`);
export const createTrip = (data) => api.post('/routes/trips/', data);
export const updateTrip = (id, data) => api.patch(`/routes/trips/${id}/`, data);
export const deleteTrip = (id) => api.delete(`/routes/trips/${id}/`);
export const getCities = () => api.get('/routes/cities/');