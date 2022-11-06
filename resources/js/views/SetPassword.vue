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
					<div class="my-2 text-sm">
						<p
							:class="[
								has_minimum_length
									? 'text-green-500'
									: 'text-gray-400',
								'flex items-center mt-1',
							]"
						>
							<ShieldCheckIcon class="w-5 h-5 mr-1" /> Has at
							least 8 characters
						</p>
						<p
							:class="[
								has_lowercase
									? 'text-green-500'
									: 'text-gray-400',
								'flex items-center mt-1',
							]"
						>
							<ShieldCheckIcon class="w-5 h-5 mr-1" /> Has a lower
							case characters
						</p>
						<p
							:class="[
								has_uppercase
									? 'text-green-500'
									: 'text-gray-400',
								'flex items-center mt-1',
							]"
						>
							<ShieldCheckIcon class="w-5 h-5 mr-1" /> Has an
							upper case characters
						</p>
						<p
							:class="[
								has_number ? 'text-green-500' : 'text-gray-400',
								'flex items-center mt-1',
							]"
						>
							<ShieldCheckIcon class="w-5 h-5 mr-1" /> Has a
							number
						</p>
						<p
							:class="[
								has_special
									? 'text-green-500'
									: 'text-gray-400',
								'flex items-center mt-1',
							]"
						>
							<ShieldCheckIcon class="w-5 h-5 mr-1" /> Has a
							special character
						</p>
					</div>
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
					:disabled="btnDisabled"
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
import { LockClosedIcon, ShieldCheckIcon } from "@heroicons/vue/24/outline";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../store/user";
import { ref, computed, reactive } from "vue";
import {
	Form,
	Field,
	ErrorMessage,
	useForm,
	useIsFormValid,
	useIsFormDirty,
} from "vee-validate";
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

const user = reactive({
	email: route.query.email,
	password: "",
	password_confirmation: "",
	token: route.params.token,
});

const { isSubmitting, handleSubmit } = useForm();
const isValid = useIsFormValid();
const isDirty = useIsFormDirty();
const userStore = useUserStore();

const has_minimum_length = computed(() => {
	return user.password.length > 8;
});
const has_number = computed(() => {
	return /\d/.test(user.password);
});
const has_lowercase = computed(() => {
	return /[a-z]/.test(user.password);
});
const has_uppercase = computed(() => {
	return /[A-Z]/.test(user.password);
});
const has_special = computed(() => {
	return /[!@#\$%\^\&*\)\(+=._-]/.test(user.password);
});

const conditions_met = computed(() => {
	return (
		has_minimum_length.value &&
		has_number.value &&
		has_lowercase.value &&
		has_uppercase.value &&
		has_special.value
	);
});

const btnDisabled = computed(() => {
	return (
		isSubmitting.value ||
		!conditions_met.value ||
		!isValid.value ||
		![user.password].includes(user.password_confirmation)
	);
});

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
