<script setup>
import { v4 as uuidv4 } from "uuid";
import { useRouter, useRoute } from "vue-router";
import DefaultPage from "../../components/DefaultPage.vue";
import { onMounted, reactive } from "vue";
import { useWorkflowStore } from "../../store/workflow";
import ItemEditor from "../../components/workflows/ItemEditor.vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { PlusIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();
const workflowStore = useWorkflowStore();
const { handleSubmit, isSubmitting } = useForm();

const state = reactive({
	id: route.params.id,
	workflow: null,
});

const toggleCheckbox = (value) => {
	state.workflow.default = value;
};

const schema = yup.object({
	title: yup.string().required(),
});

const updateWorkflow = handleSubmit(() => {
	workflowStore.update(state.workflow).then(() => {});
});

const addItem = () => {
	workflow.tasks.push({
		id: uuidv4(),
		title: "",
		description: "",
	});
};

const deleteItem = (deletedItem) => {
	state.workflow.tasks = state.workflow.tasks.filter((item) => {
		return item !== deletedItem;
	});
};

const itemChange = (changedItem) => {
	console.log(changedItem);
	const _tasks = [...state.workflow.tasks];
	let changeItem = _tasks.filter((item) => item === changedItem);
	changeItem = changedItem;
	console.log(_tasks);
	// state.workflow.tasks = _tasks;
	Object.assign(state.workflow.tasks, _tasks);
};

onMounted(() => {
	let storeWorkflow = workflowStore.workflows.find(
		(item) => item.id === parseInt(state.id)
	);

	if (!storeWorkflow) {
		workflowStore.fetchById(state.id).then((response) => {
			console.log(response);
			storeWorkflow = response;

			state.workflow = storeWorkflow;
		});
	} else {
		state.workflow = storeWorkflow;
	}
});
</script>

<template>
	<DefaultPage
		v-if="state.workflow"
		:title="`Workflow: ${state.workflow.title}`"
		button_text="Add Workflow"
		@onBtnClick="router.push({ name: 'WorkflowCreate' })"
	>
		<div class="mt-10 sm:mt-0 py-2">
			<Form @submit="updateWorkflow" :validation-schema="schema">
				<div class="grid grid-cols-6 gap-2">
					<div class="col-span-6 form-control">
						<label
							for="title"
							class="label block font-bold text-gray-700"
							>Workflow Title</label
						>
						<Field
							type="text"
							name="title"
							v-model="state.workflow.title"
							id="title"
							class="input input-bordered w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					<div class="col-span-6 flex items-center">
						<Field
							id="default"
							name="default"
							type="checkbox"
							class="checkbox mr-2"
							:checked="state.workflow.default"
							@click="toggleCheckbox($event.target.checked)"
						/>
						<label
							for="default"
							class="label block text-sm font-medium text-gray-700"
							>Assign to new users</label
						>
					</div>
					<div class="col-span-6 form-control">
						<label
							for="title"
							class="label block font-bold text-gray-700"
							>Workflow type</label
						>
						<div class="my-1 flex items-center">
							<input
								type="radio"
								name="type"
								value="daily"
								v-model="state.workflow.type"
								id="daily"
								class="mr-2 radio"
							/>
							<label for="daily">Daily</label>
						</div>
						<div class="my-1 flex items-center">
							<input
								type="radio"
								name="type"
								value="once"
								v-model="state.workflow.type"
								id="once"
								class="mr-2 radio"
							/>
							<label for="once">Once</label>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-6 gap-2 mb-6">
					<div class="col-span-6">
						<label class="label font-bold flex items-center">
							Workflow tasks
							<button
								type="button"
								@click="addItem()"
								class="flex items-center ml-4 text-sm py-1 px-4 rounded text-white bg-gray-600 hover:bg-gray-700"
							>
								Add task
								<PlusIcon
									class="ml-1 h-4 w-4"
									aria-hidden="true"
								/>
							</button>
						</label>
						<div class="w-80">
							<p
								v-if="!state.workflow.tasks.length"
								class="text-gray-600 text-sm"
							>
								You don't have any tasks in this workflow yet
							</p>
							<div v-for="(task, index) in state.workflow.tasks">
								<ItemEditor
									:task="task"
									:index="index"
									@change="itemChange"
									@deleteItem="deleteItem"
								></ItemEditor>
							</div>
						</div>
					</div>
				</div>

				<button
					type="submit"
					class="btn btn-primary inline-flex justify-center normal-case rounded-lg border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Update
				</button>
			</Form>
		</div>
	</DefaultPage>
</template>

<style scoped></style>
