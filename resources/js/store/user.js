import { defineStore } from "pinia";
import httpClient from "../axios";

export const useUserStore = defineStore("user", {
	state: () => ({
		user: {
			data: {},
			token: sessionStorage.getItem("TOKEN"),
		},
	}),
	getters: {
		getPostsPerAuthor: (state) => {
			return (authorId) =>
				state.posts.filter((post) => post.userId === authorId);
		},
	},
	actions: {
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
				sessionStorage.removeItem("TOKEN");
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
			sessionStorage.setItem("TOKEN", userData.token);
		},
	},
});
