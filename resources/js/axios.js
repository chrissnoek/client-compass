import axios from "axios";
import store from "./store";
const httpClient = axios.create({
	baseURL: "http://client-compass.test/api",
});

httpClient.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${store.state.user.token}`;
	return config;
});

export default httpClient;
