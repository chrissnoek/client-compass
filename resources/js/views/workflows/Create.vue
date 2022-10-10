<template>
	<div class="bg-base-100 shadow-xl mx-auto max-w-5xl">
		<div class="card-body shadow p-6">
			<h1 class="text-2xl font-bold">Create new workflow</h1>
			<div class="mt-10 sm:mt-0 py-2">
				<Form @submit="createWorkflow" :validation-schema="schema">
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
								v-model="workflow.title"
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
								:checked="workflow.default"
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
									v-model="workflow.type"
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
									v-model="workflow.type"
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
								Workflow items
								<button
									type="button"
									@click="addItem()"
									class="flex items-center ml-4 text-sm py-1 px-4 rounded text-white bg-gray-600 hover:bg-gray-700"
								>
									Add item
									<PlusIcon
										class="ml-1 h-4 w-4"
										aria-hidden="true"
									/>
								</button>
							</label>
							<div class="w-80">
								<p
									v-if="!workflow.items.length"
									class="text-gray-600 text-sm"
								>
									You don't have any items in this workflow
									yet
								</p>
								<div v-for="(item, index) in workflow.items">
									<ItemEditor
										:item="item"
										:index="index"
										@change="itemChange"
										@addItem="addItem"
										@deleteItem="deleteItem"
									></ItemEditor>
								</div>
							</div>
						</div>
					</div>

					<button
						type="submit"
						class="btn btn-primary inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Create
					</button>
				</Form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useWorkflowStore } from "../../store/workflow";
import { reactive } from "vue";
import { PlusIcon } from "@heroicons/vue/solid";
import ItemEditor from "../../components/WorkflowEditor/ItemEditor.vue";

const { handleSubmit, isSubmitting } = useForm();
const router = useRouter();
const workflowStore = useWorkflowStore();

const workflow = reactive({
	title: "",
	default: true,
	items: [],
	type: "daily",
});

const addItem = () => {
	workflow.items.push({
		id: uuidv4(),
		title: "",
		description: "",
	});
};

const deleteItem = (deletedItem) => {
	workflow.items = workflow.items.filter((item) => {
		return item !== deletedItem;
	});
};

const itemChange = (changedItem) => {
	console.log(changedItem);
	const _items = [...workflow.items];
	let changeItem = _items.filter((item) => item === changedItem);
	changeItem = changedItem;
	workflow.items = _items;
};

const toggleCheckbox = (value) => {
	workflow.default = value;
};

const schema = yup.object({
	title: yup.string().required(),
});

const emit = defineEmits(["close"]);

const createWorkflow = handleSubmit(() => {
	console.log(workflow);
	workflowStore.create(workflow).then((response) => {
		console.log(response);
		router.push({
			name: "WorkflowShow",
			params: { id: response.data.id },
		});
	});

	emit("close");
});
</script>

<style scoped></style>
