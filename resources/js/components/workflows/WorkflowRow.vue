<script setup>
import { CheckIcon, XMarkIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
	workflow: Object,
	index: Number,
});

const emit = defineEmits(["delete"]);

const deleteWorkflow = () => {
	emit("delete", props.workflow);
};
</script>

<template>
	<!-- <pre>
		{{ workflow }}
	</pre
	> -->
	<tr
		class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
	>
		<th class="py-4 px-6">
			<label>
				<input type="checkbox" class="checkbox" />
			</label>
		</th>
		<td
			class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
		>
			{{ workflow.title }}
		</td>
		<td class="py-4 px-6">
			<CheckIcon
				class="h-6 w-6 text-green-500"
				aria-hidden="true"
				v-if="workflow.default"
			/>
			<XMarkIcon v-else class="h-6 w-6 text-red-500" aria-hidden="true" />
		</td>
		<td class="py-4 px-6">{{ workflow.type }}</td>
		<td class="py-4 px-6">{{ workflow.tasks.length }}</td>
		<th class="p-4 flex items-center gap-3.5">
			<button
				@click="
					router.push({
						name: 'WorkflowShow',
						params: { id: workflow.id },
					})
				"
				class="btn btn-secondary btn-sm"
			>
				details
			</button>
			<button class="btn btn-danger btn-sm" @click="deleteWorkflow">
				<TrashIcon class="h-6 w-6 text-white" aria-hidden="true" />
			</button>
		</th>
	</tr>
	<!-- row 2 -->
</template>
