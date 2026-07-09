import api from './axios';

export const getTripSeats = (tripId) => api.get(`/bookings/trip/${tripId}/seats/`);
export const lockSeat = (tripSeatId) => api.post(`/bookings/lock-seat/${tripSeatId}/`);
export const createBooking = (data) => api.post('/bookings/create/', data);
export const getMyBookings = () => api.get('/bookings/my-bookings/');
export const cancelBooking = (bookingId) => api.post(`/bookings/cancel/${bookingId}/`);
export const getAdminStats = () => api.get('/bookings/admin/stats/');