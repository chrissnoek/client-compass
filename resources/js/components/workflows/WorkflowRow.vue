<script setup>
import { CheckIcon, XIcon } from "@heroicons/vue/solid";

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
		<th class="py-4 px-6">
			<label>
				<input type="checkbox" class="checkbox" />
			</label>
		</th>
		<td class="py-4 px-6">
			<div class="flex items-center space-x-3">
				<div>
					<div class="font-bold">{{ workflow.title }}</div>
				</div>
			</div>
		</td>
		<td class="py-4 px-6">
			<CheckIcon
				class="h-6 w-6 text-green-500"
				aria-hidden="true"
				v-if="workflow.default"
			/>
			<XIcon v-else class="h-6 w-6 text-red-500" aria-hidden="true" />
		</td>
		<td class="py-4 px-6">{{ workflow.type }}</td>
		<td class="py-4 px-6">{{ workflow.tasks_count }}</td>
		<th class="py-4 px-6">
			<button class="btn btn-ghost btn-xs">details</button>
		</th>
	</tr>
	<!-- row 2 -->
</template>
