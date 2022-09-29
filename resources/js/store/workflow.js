import { defineStore } from "pinia";
import httpClient from "../axios";

export const useWorkflowStore = defineStore("workflow", {
	state: () => ({
		workflows: [],
	}),
	getters: {},
	actions: {
		create(user) {
			return httpClient
				.post("/workflows", user)
				.then((response) => {
					console.log(response);
				})
				.then((response) => {
					return response;
				});
		},
		fetchById(id) {
			return httpClient
				.get(`/workflows/${id}`)
				.then((response) => {
					console.log(response);
				})
				.then((response) => {
					return response;
				});
		},
	},
});
