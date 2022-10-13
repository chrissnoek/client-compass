import { defineStore } from "pinia";
import httpClient from "../axios";

export const useWorkflowStore = defineStore("workflow", {
	state: () => ({
		workflows: [],
	}),
	getters: {},
	actions: {
		fetch() {
			return httpClient
				.get(`/workflows`)
				.then((response) => {
					this.workflows = response.data.data;
					console.log(response);
				})
				.then((response) => {
					return response;
				});
		},
		create(workflow) {
			return httpClient
				.post("/workflows", workflow)
				.then((response) => {
					this.workflows.push(response.data.data);
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
