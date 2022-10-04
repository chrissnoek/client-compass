<script setup>
import { TrashIcon } from "@heroicons/vue/solid";

const props = defineProps({
	item: Object,
	index: Number,
});

const emit = defineEmits(["change", "deleteItem"]);

const deleteThis = () => {
	emit("deleteItem", props.item);
};

const changeItem = () => {
	emit("change", props.item);
};
</script>

<template>
	<div class="mb-2">
		<div class="flex items-center justify-between">
			<input
				type="text"
				@input="changeItem"
				v-model="item.title"
				class="input input-bordered w-full my-1"
			/>
			<div class="flex items-center">
				<button
					type="button"
					@click="deleteThis()"
					class="flex items-center ml-4 text-sm py-4 px-4 rounded text-white bg-red-500 hover:bg-red-600"
				>
					<TrashIcon class="ml-1 h-4 w-4" aria-hidden="true" />
				</button>
			</div>
		</div>
	</div>
</template>
