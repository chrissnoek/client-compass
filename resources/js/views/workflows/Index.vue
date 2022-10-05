<template>
	<DefaultPage
		title="Workflows"
		button_text="Add workflow"
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
											src="/tailwind-css-component-profile-2@56w.png"
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
											src="/tailwind-css-component-profile-3@56w.png"
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
											src="/tailwind-css-component-profile-4@56w.png"
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
											src="/tailwind-css-component-profile-5@56w.png"
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
	<VueFinalModal
		v-model="showCreate"
		classes="modal-container"
		content-class="modal-content"
	>
		<div class="modal-content">
			<button class="modal__close" @click="showCreate = false">
				<XIcon class="h-6 w-6" aria-hidden="true" />
			</button>
			<WorkflowCreate />
		</div>
	</VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from "vue-final-modal";
import { useRouter } from "vue-router";
import DefaultPage from "../../components/DefaultPage.vue";
import WorkflowCreate from "./Create.vue";
import { ref } from "vue";
import { XIcon } from "@heroicons/vue/solid";

const showCreate = ref(false);

const router = useRouter();
</script>

<style scoped>
:deep .modal-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

:deep .modal-content {
	position: relative;
	display: flex;
	flex-direction: column;
	max-height: 90%;
	overflow-y: auto;
	border-radius: 1rem;
}
:deep .modal__close {
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
}
</style>
