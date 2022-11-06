import axios from "axios";

const httpClient = axios.create({
	baseURL: "http://client-compass.test/api",
});

httpClient.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
	return config;
});

export default httpClient;
