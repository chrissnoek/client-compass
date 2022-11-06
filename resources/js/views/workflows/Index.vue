<template>
	<DefaultPage
		title="Workflows"
		button_text="Add workflow"
		@onBtnClick="state.showCreate = true"
	>
		<div
			class="overflow-x-auto relative shadow-md sm:rounded-lg"
			v-if="state.workflowsLoaded && workflowStore.workflows.length"
		>
			<table
				class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
			>
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<!-- head -->
					<tr>
						<th scope="col" class="p-4">
							<div class="flex items-center">
								<input
									id="checkbox-all"
									type="checkbox"
									class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label for="checkbox-all" class="sr-only"
									>checkbox</label
								>
							</div>
						</th>
						<th scope="col" class="py-3 px-6">Name</th>
						<th scope="col" class="py-3 px-6">
							Default for new users
						</th>
						<th scope="col" class="py-3 px-6">Type</th>
						<th scope="col" class="py-3 px-6">Tasks</th>
						<th scope="col" class="py-3 px-6"></th>
					</tr>
				</thead>

				<tbody>
					<WorkflowRow
						v-for="(workflow, i) in workflowStore.workflows"
						:workflow="workflow"
						@delete="showDeleteWorkflowModal"
					/>
				</tbody>
				<!-- foot -->
				<tfoot
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="p-4"></th>
						<th scope="col" class="p-4">Name</th>
						<th scope="col" class="p-4">Default for new users</th>
						<th scope="col" class="p-4">Type</th>
						<th scope="col" class="p-4">Tasks</th>
						<th scope="col" class="p-4"></th>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="text-center" v-else>
			<p class="text-2xl mb-4">There are no workflows yet</p>
			<button
				@click="state.showCreate = true"
				class="btn btn-primary mx-auto"
			>
				Create one now!
			</button>
		</div>
	</DefaultPage>
	<VueFinalModal
		v-model="state.showDelete"
		classes="modal-container"
		content-class="modal-content"
	>
		<div class="bg-base-100 shadow-xl mx-auto max-w-5xl">
			<div class="card-body shadow p-6">
				<button class="modal__close" @click="closeDelete">
					<XMarkIcon
						class="h-4 w-4 text-gray-500"
						aria-hidden="true"
					/>
				</button>
				<div class="modal-content p-4">
					<h2 class="font-bold text-lg px-6 mb-4">
						Are you sure you want to delete
						{{ state.deletingWorkflow.title }}?
					</h2>
					<div class="flex justify-center gap-4">
						<button
							type="button"
							class="btn btn-secondary"
							@click="closeDelete"
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn btn-error"
							@click="deleteWorkflow"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</VueFinalModal>
	<VueFinalModal
		v-model="state.showCreate"
		classes="modal-container"
		content-class="modal-content"
	>
		<div class="modal-content">
			<button class="modal__close" @click="state.showCreate = false">
				<XMarkIcon class="h-6 w-6" aria-hidden="true" />
			</button>
			<WorkflowCreate @close="state.showCreate = false" />
		</div>
	</VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from "vue-final-modal";
import { useRouter } from "vue-router";
import DefaultPage from "../../components/DefaultPage.vue";
import WorkflowCreate from "./Create.vue";
import WorkflowRow from "../../components/workflows/WorkflowRow.vue";
import { inject, onMounted, reactive } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useWorkflowStore } from "../../store/workflow";

const state = reactive({
	workflowsLoaded: false,
	showDelete: false,
	deletingWorkflow: {},
	showCreate: false,
});

const workflowStore = useWorkflowStore();
const emitter = inject("emitter");

const router = useRouter();

const showDeleteWorkflowModal = (workflow) => {
	state.deletingWorkflow = workflow;
	state.showDelete = true;
};

const closeDelete = () => {
	state.showDelete = false;
	state.deletingWorkflow = {};
};

const deleteWorkflow = () => {
	if (Object.keys(state.deletingWorkflow).length) {
		workflowStore.delete(state.deletingWorkflow).then((response) => {
			emitter.emit("flash", {
				message: "Succesfully deleted!",
				type: "success",
			});
		});
		state.showDelete = false;
	}
};

onMounted(() => {
	workflowStore.fetch().then((response) => {
		state.workflowsLoaded = true;
	});
});
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
