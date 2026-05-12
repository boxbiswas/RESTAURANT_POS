import axios from "axios";

// Use the Vite dev proxy by default so local requests stay same-origin.
// Set VITE_API_BASE_URL to an absolute backend URL when needed.
const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
	withCredentials: true,
	headers: { 
		"Content-Type": "application/json",
		"Accept": "application/json"
	},
});

// API Endpoints
export const login = (data) => api.post("/user/login", data);
export const register = (data) => api.post("/user/register", data);
export const getUserData = () => api.get("/user");
export const logout = () => api.post("/user/logout");

// Payment Endpoints
export const createOrderRazorpay = async (data) => {
	const response = await api.post("/payment/create-order", data);
	return response.data;
};

export const verifyPaymentRazorpay = async (data) => {
	const response = await api.post("/payment/verify-payment", data);
	return response.data;
};

export default api;