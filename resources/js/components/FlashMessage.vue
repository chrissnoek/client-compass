<script setup>
import { onMounted } from "vue";

const props = defineProps({
	alert: Object,
});

const emits = defineEmits(["delete"]);

onMounted(() => {
	setTimeout(() => {
		emits("delete", props.alert.id);
	}, 3000);
});
</script>

<template>
	<div
		role="alert"
		:class="[
			'p-4 text-sm rounded-lg mb-4',
			{
				'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800':
					props.alert.type === 'info',
			},
			{
				'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800':
					props.alert.type === 'danger',
			},
			{
				'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800':
					props.alert.type === 'success',
			},
			{
				'text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800':
					props.alert.type === 'warning',
			},
		]"
	>
		{{ props.alert.message }}
	</div>
</template>
