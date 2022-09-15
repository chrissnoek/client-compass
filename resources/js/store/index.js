import { createStore } from "vuex";
import httpClient from "../axios";

const store = createStore({
	state: {
		user: {
			data: {},
			token: sessionStorage.getItem("TOKEN"),
		},
	},
	getters: {},
	actions: {
		register: ({ commit }, user) => {
			return httpClient.post("/register", user).then(({ data }) => {
				// commit("setUser", data);
				return data;
			});
		},
		login: ({ commit }, user) => {
			return httpClient.post("/login", user).then(({ data }) => {
				commit("setUser", data);
				return data;
			});
		},
		logout: ({ commit }) => {
			return httpClient.post("/logout").then((response) => {
				commit("logout");
				return response;
			});
		},
		setPassword: ({ commit }, user) => {
			return httpClient.put("/set-password", user).then(({ data }) => {
				commit("setUser", data);
				return data;
			});
		},
		createClient: ({ commit }, user) => {
			return httpClient.post("/clients", user).then(({ data }) => {
				return data;
			});
		},
	},
	mutations: {
		logout: (state) => {
			state.user.data = {};
			state.user.token = null;
			sessionStorage.removeItem("TOKEN");
		},
		setUser: (state, userData) => {
			state.user.token = userData.token;
			state.user.data = userData.user;
			sessionStorage.setItem("TOKEN", userData.token);
		},
	},
	modules: {},
});

export default store;
