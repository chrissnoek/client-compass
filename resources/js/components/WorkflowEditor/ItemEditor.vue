<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { TrashIcon, PlusIcon } from "@heroicons/vue/solid";
import { ref } from "vue";

const props = defineProps({
	item: Object,
	index: Number,
});

const emit = defineEmits(["change", "deleteItem"]);

const deleteThis = () => {
	emit("deleteItem", props.item);
};

const descOpen = ref(false);

const changeItem = () => {
	emit("change", props.item);
};
</script>
<template>
	<div class="mb-2 rounded p-3 bg-gray-100">
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
					class="flex items-center ml-1 text-sm py-4 px-4 rounded text-white bg-red-500 hover:bg-red-600"
				>
					<TrashIcon class="h-4 w-4" aria-hidden="true" />
				</button>
			</div>
		</div>
		<div
			class="flex items-center p-1 hover:bg-gray-200 rounded cursor-pointer"
			@click="descOpen = true"
			v-if="!descOpen"
		>
			<PlusIcon class="h-4 w-4 mr-1" aria-hidden="true" />
			<p class="font-bold text-sm leading-none">Add task description</p>
		</div>
		<QuillEditor
			v-if="descOpen"
			theme="snow"
			v-model:content="item.description"
			contentType="html"
			:toolbar="['link', 'bold', 'italic']"
			class=""
		/>
	</div>
</template>
