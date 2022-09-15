<template>
	<DefaultPage title="Create Client">
		<div class="card bg-base-100 shadow-xl mx-auto max-w-lg prose">
			<div class="card-body shadow p-6">
				<div>
					<div class="">
						<div class="">
							<form @submit="createClient">
								<div>
									<div class="">
										<div class="grid grid-cols-6 gap-6">
											<div
												class="col-span-6 sm:col-span-3"
											>
												<label
													for="first-name"
													class="block font-medium text-gray-700"
													>First name</label
												>
												<input
													type="text"
													name="first-name"
													id="first-name"
													autocomplete="given-name"
													class="mt-1 input input-bordered w-full"
													v-model="user.first_name"
												/>
											</div>

											<div
												class="col-span-6 sm:col-span-3"
											>
												<label
													for="last-name"
													class="block font-medium text-gray-700"
													>Last name</label
												>
												<input
													type="text"
													name="last-name"
													id="last-name"
													autocomplete="family-name"
													class="mt-1 input input-bordered w-full"
													v-model="user.last_name"
												/>
											</div>

											<div class="col-span-6">
												<label
													for="email-address"
													class="block font-medium text-gray-700"
													>Email address</label
												>
												<input
													type="text"
													name="email-address"
													id="email-address"
													autocomplete="email"
													class="mt-1 input input-bordered w-full"
													v-model="user.email"
												/>
											</div>
										</div>
									</div>
								</div>
								<div class="flex items-center">
									<div class="mt-3 flex items-center">
										<input
											id="send-credentials"
											type="checkbox"
											class="checkbox mr-2"
											v-model="user.send_credentials"
										/>
										<label for="send-credentials"
											>Send user onboarding email</label
										>
									</div>
									<div class="pt-3 ml-auto">
										<button
											type="submit"
											class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Save
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</DefaultPage>
</template>

<script setup>
import DefaultPage from "../../components/DefaultPage.vue";
import store from "../../store";

const user = {
	first_name: "",
	last_name: "",
	email: "",
	send_credentials: "",
};

const createClient = (e) => {
	e.preventDefault();
	console.log(user);

	// post request to /users with user request object
	store.dispatch("createClient", user).then((response) => {
		console.log(response);

		// to go /clients/{id}

		// router.push({
		// 	name: "SentPasswordSetMail",
		// });
	});
};
</script>

<style scoped></style>
