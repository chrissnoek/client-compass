<template>
	<DefaultPage
		title="Workflows"
		button_text="Add workflow"
		@onBtnClick="showCreate = true"
	>
		<div
			class="overflow-x-auto relative shadow-md sm:rounded-lg"
			v-if="workflowsLoaded && workflowStore.workflows.length"
		>
			<table
				class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
			>
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
				>
					<!-- head -->
					<tr>
						<th scope="col" class="p-4">
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<th scope="col" class="p-4">Name</th>
						<th scope="col" class="p-4">Default for new users</th>
						<th scope="col" class="p-4">Type</th>
						<th scope="col" class="p-4">Tasks</th>
						<th scope="col" class="p-4"></th>
					</tr>
				</thead>

				<tbody>
					<WorkflowRow
						v-for="(workflow, i) in workflowStore.workflows"
						:workflow="workflow"
						@delete="deleteWorkflow"
					/>
				</tbody>
				<!-- foot -->
				<tfoot
					class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
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
			<button @click="showCreate = true" class="btn btn-primary mx-auto">
				Create one now!
			</button>
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
			<WorkflowCreate
				@create="handleCreate"
				@close="showCreate = false"
			/>
		</div>
	</VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from "vue-final-modal";
import { useRouter } from "vue-router";
import DefaultPage from "../../components/DefaultPage.vue";
import WorkflowCreate from "./Create.vue";
import WorkflowRow from "../../components/workflows/WorkflowRow.vue";
import { onMounted, ref } from "vue";
import { XIcon } from "@heroicons/vue/solid";
import { useWorkflowStore } from "../../store/workflow";

const showCreate = ref(false);
let workflowsLoaded = ref(false);
const workflowStore = useWorkflowStore();

const router = useRouter();

const deleteWorkflow = (workflow) => {
	workflowStore.delete(workflow).then((response) => {
		// workflowsLoaded.value = true;
	});
};

onMounted(() => {
	workflowStore.fetch().then((response) => {
		workflowsLoaded.value = true;
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
