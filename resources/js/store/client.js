import { defineStore } from "pinia";
import httpClient from "../axios";

export const useClientStore = defineStore("client", {
	state: () => ({
		clients: [],
	}),
	getters: {},
	actions: {
		create(user) {
			return httpClient
				.post("/clients", user)
				.then((response) => {
					console.log(response);
				})
				.then((response) => {
					return response;
				});
		},
		fetchById(id) {
			return httpClient
				.get(`/clients/${id}`)
				.then((response) => {
					console.log(response);
				})
				.then((response) => {
					return response;
				});
		},
	},
});
