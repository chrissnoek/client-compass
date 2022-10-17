<script setup>
// import { CheckIcon, XIcon, TrashIcon } from "@heroicons/vue/solid";
import { CheckIcon, XIcon, TrashIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
	workflow: Object,
	index: Number,
});
</script>

<template>
	<!-- <pre>
		{{ workflow }}
	</pre
	> -->
	<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
		<th class="p-4">
			<label>
				<input type="checkbox" class="checkbox" />
			</label>
		</th>
		<td class="p-4">
			<div class="flex items-center space-x-3">
				<div>
					<div class="font-bold">{{ workflow.title }}</div>
				</div>
			</div>
		</td>
		<td class="p-4">
			<CheckIcon
				class="h-6 w-6 text-green-500"
				aria-hidden="true"
				v-if="workflow.default"
			/>
			<XIcon v-else class="h-6 w-6 text-red-500" aria-hidden="true" />
		</td>
		<td class="p-4">{{ workflow.type }}</td>
		<td class="p-4">{{ workflow.tasks.length }}</td>
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
			<button class="btn btn-danger btn-sm">
				<TrashIcon class="h-6 w-6 text-white" aria-hidden="true" />
			</button>
		</th>
	</tr>
	<!-- row 2 -->
</template>
