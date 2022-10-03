<template>
	<DefaultPage
		title="Clients"
		button_text="Add Client"
		@onBtnClick="showCreate = true"
	>
		<div class="overflow-x-auto w-full">
			<table class="table w-full">
				<!-- head -->
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<!-- row 1 -->
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img
											src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
											alt="Avatar Tailwind CSS Component"
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">Hart Hagerty</div>
									<div class="text-sm opacity-50">
										United States
									</div>
								</div>
							</div>
						</td>
						<td>
							Zemlak, Daniel and Leannon
							<br />
							<span class="badge badge-ghost badge-sm"
								>Desktop Support Technician</span
							>
						</td>
						<td>Purple</td>
						<th>
							<button class="btn btn-ghost btn-xs">
								details
							</button>
						</th>
					</tr>
					<!-- row 2 -->
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img
											src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
											alt="Avatar Tailwind CSS Component"
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">Brice Swyre</div>
									<div class="text-sm opacity-50">China</div>
								</div>
							</div>
						</td>
						<td>
							Carroll Group
							<br />
							<span class="badge badge-ghost badge-sm"
								>Tax Accountant</span
							>
						</td>
						<td>Red</td>
						<th>
							<button class="btn btn-ghost btn-xs">
								details
							</button>
						</th>
					</tr>
					<!-- row 3 -->
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img
											src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
											alt="Avatar Tailwind CSS Component"
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">Marjy Ferencz</div>
									<div class="text-sm opacity-50">Russia</div>
								</div>
							</div>
						</td>
						<td>
							Rowe-Schoen
							<br />
							<span class="badge badge-ghost badge-sm"
								>Office Assistant I</span
							>
						</td>
						<td>Crimson</td>
						<th>
							<button class="btn btn-ghost btn-xs">
								details
							</button>
						</th>
					</tr>
					<!-- row 4 -->
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img
											src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
											alt="Avatar Tailwind CSS Component"
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">Yancy Tear</div>
									<div class="text-sm opacity-50">Brazil</div>
								</div>
							</div>
						</td>
						<td>
							Wyman-Ledner
							<br />
							<span class="badge badge-ghost badge-sm"
								>Community Outreach Specialist</span
							>
						</td>
						<td>Indigo</td>
						<th>
							<button class="btn btn-ghost btn-xs">
								details
							</button>
						</th>
					</tr>
				</tbody>
				<!-- foot -->
				<tfoot>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</DefaultPage>

	<VueFinalModal v-model="showCreate" classes="modal-container">
		<ClientCreate />
	</VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from "vue-final-modal";
import { useRouter } from "vue-router";
import DefaultPage from "../../components/DefaultPage.vue";
import ClientCreate from "./Create.vue";
import { ref } from "vue";

const showCreate = ref(false);

const router = useRouter();
</script>

<style scoped>
:deep .modal-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
