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
		<Form
			class="mt-8 bg-white shadow-md rounded-md p-10"
			@submit="setPassword"
			:validation-schema="schema"
		>
			<div class="rounded-md shadow-sm">
				<div class="mb-2">
					<label for="email" class="sr-only">Email address</label>
					<Field
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
					<Field
						v-model="user.password"
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						required=""
						class="input input-bordered appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
					<ErrorMessage
						name="password"
						as="p"
						class="text-red-500 text-sm"
					/>
				</div>
				<div class="mb-2">
					<label for="password_confirmation" class="sr-only"
						>Password Confirmation</label
					>
					<Field
						v-model="user.password_confirmation"
						id="password_confirmation"
						name="password_confirmation"
						type="password"
						autocomplete="new-password"
						required=""
						class="input input-bordered appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password confirmation"
					/>
					<ErrorMessage
						name="password_confirmation"
						as="p"
						class="text-red-500 text-sm"
					/>
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
					Reset Password
				</button>
			</div>
		</Form>
	</div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../store/user";
import { ref } from "vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required(),
	password_confirmation: yup
		.string()
		.required()
		.oneOf([yup.ref("password")], "Your password should match"),
});

const router = useRouter();
const route = useRoute();

const { isSubmitting, handleSubmit } = useForm();
const userStore = useUserStore();

const user = {
	email: route.query.email,
	password: "",
	password_confirmation: "",
	token: route.params.token,
};

const errors = ref(null);

const setPassword = handleSubmit(() => {
	userStore
		.setPassword(user)
		.then(() => {
			router.push({
				name: "Dashboard",
			});
		})
		.catch((e) => {
			errors.value = e.response.data.errors;
		});
});
</script>
