import { defineStore } from "pinia";
import httpClient from "../axios";

export const useWorkflowStore = defineStore("workflow", {
	state: () => ({
		workflows: [],
	}),
	getters: {},
	actions: {
		create(workflow) {
			return httpClient
				.post("/workflows", workflow)
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
