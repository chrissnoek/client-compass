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
		update(workflow) {
			return httpClient
				.put(`/workflows/${workflow.id}`, workflow)
				.then((response) => {
					this.workflows.push(response.data.data);
				})
				.then((response) => {
					return response;
				});
		},
		fetchById(id) {
			return httpClient.get(`/workflows/${id}`).then((response) => {
				console.log(response);
				// check if there is already a workflow in store with this is
				const index = this.workflows.findIndex(
					(item) => item.id === id
				);
				// if so, replace this index
				if (index !== -1) {
					this.workflows[index] = response.data.data;
				} else {
					// it not, add it to the store
					this.workflows.push(response.data.data);
				}

				return response.data.data;
			});
		},
	},
});
