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
				Register for free
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Or
				{{ " " }}
				<router-link
					:to="{ name: 'Login' }"
					class="font-medium text-indigo-600 hover:text-indigo-500"
				>
					login to your account
				</router-link>
			</p>
		</div>
		<form
			class="mt-8 bg-white shadow-md rounded-md p-10"
			@submit="register"
		>
			<div class="rounded-md shadow-sm">
				<div class="flex justify-center mb-2">
					<div class="mr-2 w-full">
						<label for="first_name" class="sr-only"
							>First name</label
						>
						<input
							v-model="user.first_name"
							id="first_name"
							name="first_name"
							type="text"
							autocomplete="given-name"
							required=""
							class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="First name"
						/>
					</div>
					<div class="w-full">
						<label for="last_name" class="sr-only">Last name</label>
						<input
							v-model="user.last_name"
							id="last_name"
							name="last_name"
							type="text"
							autocomplete="family-name"
							required=""
							class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Last name"
						/>
					</div>
				</div>
				<div class="mb-2">
					<label for="company_name" class="sr-only"
						>Company Name</label
					>
					<input
						v-model="user.company_name"
						id="company_name"
						name="company_name"
						type="text"
						required=""
						class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Company Name"
					/>
				</div>
				<div class="mb-2">
					<label for="email" class="sr-only">Email address</label>
					<input
						v-model="user.email"
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required=""
						class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<!-- <div class="mb-2">
					<label for="password" class="sr-only">Password</label>
					<input
						v-model="user.password"
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						required=""
						class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
						class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password confirmation"
					/>
				</div> -->
			</div>

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span
						class="absolute left-0 inset-y-0 flex items-center pl-3"
					>
						<LockClosedIcon
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							aria-hidden="true"
						/>
					</span>
					Sign up
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { useRouter } from "vue-router";
import store from "../store";
import { ref } from "vue";

const router = useRouter();

const user = {
	first_name: "",
	last_name: "",
	email: "",
	company_name: "",
};

const register = (ev) => {
	ev.preventDefault();
	console.log(user);
	store.dispatch("register", user).then(() => {
		router.push({
			name: "SentPasswordSetMail",
		});
	});
};
</script>
