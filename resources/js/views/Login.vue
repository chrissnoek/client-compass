<template>
	<div>
		<div>
			<img
				class="mx-auto h-12 w-auto"
				src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
				alt="Workflow"
			/>
			<h2
				class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900"
			>
				Sign in to your account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Or
				{{ " " }}
				<router-link
					:to="{ name: 'Register' }"
					class="font-medium text-indigo-600 hover:text-indigo-500"
				>
					register for free
				</router-link>
			</p>
		</div>
		<Form
			class="mt-8"
			action=""
			@submit="login"
			:validation-schema="schema"
		>
			<!-- <div
				v-if="errorMsg"
				class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded mb-4"
			>
				{{ errorMsg }}
				<span @click="errorMsg = ''">
					<XMarkIcon
						class="h-6 w-6 cursor-pointer rounded-full p-1 transition-colors hover:bg-[rgba(0,0,0,0.2)]"
						aria-hidden="true"
					/>
				</span>
			</div> -->
			<input type="hidden" name="remember" value="true" />
			<div class="rounded-md shadow-sm -space-y-px mb-4">
				<div class="mb-2">
					<label for="email-address" class="sr-only"
						>Email address</label
					>
					<Field
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required=""
						v-model="user.email"
						class="input input-bordered appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
					/>
					<ErrorMessage name="email" class="text-red-500 text-sm" />
				</div>
				<div class="mb-2">
					<label for="password" class="sr-only">Password</label>
					<Field
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required=""
						v-model="user.password"
						class="input input-bordered appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
					<ErrorMessage
						name="password"
						class="text-red-500 text-sm"
					/>
				</div>
			</div>
			<div
				v-if="errors"
				class="bg-red-500 text-white py-2 px-4 pr-0 rounded font-bold mb-4 shadow-lg"
			>
				<div v-for="(v, k) in errors" :key="k">
					<p v-for="error in v" :key="error" class="text-sm">
						{{ error }}
					</p>
				</div>
			</div>

			<div class="flex items-center justify-between mb-4">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						v-model="user.remember"
						class="checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label
						for="remember-me"
						class="ml-2 block text-sm text-gray-900"
					>
						Remember me
					</label>
				</div>

				<div class="text-sm">
					<a
						href="#"
						class="font-medium text-indigo-600 hover:text-indigo-500"
					>
						Forgot your password?
					</a>
				</div>
			</div>

			<div>
				<button
					:disabled="isSubmitting"
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
					Sign in
				</button>
			</div>
		</Form>
	</div>
</template>

<script setup>
import { LockClosedIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { ref, onMounted } from "vue";
import axios from "axios";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";

const { isSubmitting, handleSubmit } = useForm();
const router = useRouter();
const userStore = useUserStore();

const schema = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required(),
});

const user = {
	email: "",
	password: "",
	remember: false,
};

const errors = ref(null);

const login = handleSubmit(() => {
	userStore
		.login(user)
		.then(() => {
			router.push({
				name: "Dashboard",
			});
		})
		.catch((e) => {
			console.log(e);
			errors.value = e.response.data.errors
				? e.response.data.errors
				: e.response.data.error;
		});
});
</script>
