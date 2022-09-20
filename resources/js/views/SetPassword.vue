<template>
	<div class="">
		<div>
			<img
				class="mx-auto h-12 w-auto"
				src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
				alt="Workflow"
			/>
			<h2
				class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900"
			>
				Set Password
			</h2>
		</div>
		<form
			class="mt-8 bg-white shadow-md rounded-md p-10"
			@submit="setPassword"
		>
			<div class="rounded-md shadow-sm">
				<div class="mb-2">
					<label for="email" class="sr-only">Email address</label>
					<input
						v-model="user.email"
						disabled
						id="email"
						name="email"
						type="text"
						autocomplete="off"
						required=""
						class="input input-bordered appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<div class="mb-2">
					<label for="password" class="sr-only">Password</label>
					<input
						v-model="user.password"
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						required=""
						class="input input-bordered appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
				</div>
				<div class="mb-2">
					<label for="password_confirmation" class="sr-only"
						>Password Confirmation</label
					>
					<input
						v-model="user.password_confirmation"
						id="password_confirmation"
						name="password_confirmation"
						type="password"
						autocomplete="new-password"
						required=""
						class="input input-bordered appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password confirmation"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="btn btn-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span
						class="absolute left-0 inset-y-0 flex items-center pl-3"
					>
						<LockClosedIcon
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							aria-hidden="true"
						/>
					</span>
					Reset Password
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { useRouter, useRoute } from "vue-router";
import store from "../store";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();

console.log(route.params, route.query);

const user = {
	email: route.query.email,
	password: "",
	password_confirmation: "",
	token: route.params.token,
};

const setPassword = (ev) => {
	ev.preventDefault();
	console.log(user);
	store.dispatch("setPassword", user).then(() => {
		router.push({
			name: "Dashboard",
		});
	});
};
</script>
