<template>
	<div class="card bg-base-100 shadow-xl mx-auto max-w-lg">
		<div class="card-body shadow p-6">
			<div>
				<div class="">
					<div class="">
						<Form
							@submit="createClient"
							:validation-schema="schema"
						>
							<div>
								<div class="">
									<div class="grid grid-cols-6 gap-6">
										<div
											class="col-span-6 sm:col-span-3 form-control"
										>
											<label
												for="first-name"
												class="block font-medium text-gray-700"
												>First name</label
											>
											<Field
												type="text"
												name="first_name"
												id="first_name"
												autocomplete="given-name"
												class="mt-1 input input-bordered w-full"
												v-model="user.first_name"
											/>
											<ErrorMessage
												name="first_name"
												as="p"
												class="text-red-500 text-sm"
											/>
										</div>

										<div class="col-span-6 sm:col-span-3">
											<label
												for="last-name"
												class="block font-medium text-gray-700"
												>Last name</label
											>
											<Field
												type="text"
												name="last_name"
												id="last_name"
												autocomplete="family-name"
												class="mt-1 input input-bordered w-full"
												v-model="user.last_name"
											/>
											<ErrorMessage
												name="last_name"
												as="p"
												class="text-red-500 text-sm"
											/>
										</div>

										<div class="col-span-6">
											<label
												for="email-address"
												class="block font-medium text-gray-700"
												>Email address</label
											>
											<Field
												type="text"
												name="email"
												id="email"
												autocomplete="email"
												class="mt-1 input input-bordered w-full"
												v-model="user.email"
											/>
											<ErrorMessage
												name="email"
												as="p"
												class="text-red-500 text-sm"
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="flex items-center">
								<div class="mt-3 flex items-center">
									<Field
										id="send_credentials"
										name="send_credentials"
										type="checkbox"
										class="checkbox mr-2"
										:checked="user.send_credentials"
										@click="
											toggleCheckbox(
												$event.target.checked
											)
										"
									/>
									<label for="send_credentials"
										>Send user onboarding email</label
									>
									<ErrorMessage
										name="send_credentials"
										as="p"
										class="text-red-500 text-sm"
									/>
								</div>
								<div class="pt-3 ml-auto">
									<button
										:disabled="isSubmitting"
										type="submit"
										class="btn btn-primary inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Save
									</button>
								</div>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useClientStore } from "../../store/client";
import { reactive } from "vue";

const { handleSubmit, isSubmitting } = useForm();
const router = useRouter();
const clientStore = useClientStore();

const user = reactive({
	first_name: "",
	last_name: "",
	email: "",
	send_credentials: true,
});

const schema = yup.object({
	email: yup.string().required().email(),
	first_name: yup.string().required(),
	last_name: yup.string().required(),
});

const toggleCheckbox = (value) => {
	user.send_credentials = value;
};

const createClient = handleSubmit(() => {
	clientStore.create(user).then((response) => {
		console.log(response);
		router.push({
			name: "ClientShow",
			params: { id: response.data.id },
		});
	});
});
</script>

<style scoped></style>
