import { defineStore } from "pinia";
import httpClient from "../axios";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", {
	state: () => ({
		user: {
			data: {},
			token: localStorage.getItem("TOKEN"),
		},
	}),
	getters: {
		getPostsPerAuthor: (state) => {
			return (authorId) =>
				state.posts.filter((post) => post.userId === authorId);
		},
	},
	actions: {
		fetch() {
			return httpClient
				.get("/user")
				.then(({ data }) => {
					this.user.data = data;
					return data;
				})
				.catch(() => {
					this.user.data = {};
					this.user.token = null;
					localStorage.removeItem("TOKEN");
				});
		},
		register(user) {
			return httpClient.post("/register", user).then(({ data }) => {
				return data;
			});
		},
		login(user) {
			return httpClient.post("/login", user).then(({ data }) => {
				this.setUser(data);
				return data;
			});
		},
		logout() {
			return httpClient.post("/logout").then(() => {
				this.user.data = {};
				this.user.token = null;
				localStorage.removeItem("TOKEN");
			});
		},
		setPassword(user) {
			return httpClient.put("/set-password", user).then(({ data }) => {
				this.setUser(data);
				return data;
			});
		},
		setUser(userData) {
			this.user.token = userData.token;
			this.user.data = userData.user;
			if (userData.token) {
				localStorage.setItem("TOKEN", userData.token);
			}
		},
	},
});
