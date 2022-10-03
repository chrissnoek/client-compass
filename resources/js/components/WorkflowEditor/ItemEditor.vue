<script setup>
import { PlusIcon, TrashIcon } from "@heroicons/vue/solid";

const props = defineProps({
	item: Object,
	index: Number,
});

const emits = defineEmits(["change", "addItem", "deleteItem"]);
</script>

<template>
	<div class="flex items-center justify-between">
		{{ index + 1 }} {{ item.title }}
	</div>
	<div class="flex items-center">
		<button
			type="button"
			@click="addItem()"
			class="flex items-center ml-4 text-sm py-1 px-4 rounded text-white bg-gray-600 hover:bg-gray-700"
		>
			Add item below
			<PlusIcon class="ml-1 h-4 w-4" aria-hidden="true" />
		</button>

		<button
			type="button"
			@click="deleteItem()"
			class="flex items-center ml-4 text-sm py-1 px-4 rounded text-white bg-red-500 hover:bg-red-600"
		>
			<TrashIcon class="ml-1 h-4 w-4" aria-hidden="true" />
		</button>
	</div>
</template>
