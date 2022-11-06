<template>
	<div class="w-full h-full">
		<header class="bg-white">
			<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex">
				<h1 class="text-3xl tracking-tight font-bold text-gray-900">
					{{ title }}
				</h1>
				<button
					@click="$emit('onBtnClick')"
					class="btn btn-primary ml-auto"
					v-if="button_text"
				>
					{{ button_text }}
				</button>
			</div>
		</header>
		<main>
			<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
				<!-- Replace with your content -->
				<div class="px-4 sm:px-0"><slot></slot></div>
				<!-- /End replace -->
			</div>
		</main>
	</div>
</template>

<script setup>
const props = defineProps({
	title: String,
	button_text: String,
});
</script>

<style></style>
