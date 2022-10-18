<script setup>
import { v4 as uuidv4 } from "uuid";
import FlashMessage from "./FlashMessage.vue";
import { inject, onMounted, reactive } from "vue";

const state = reactive({
	messages: [],
});

const emitter = inject("emitter");

const removeFlash = (id) => {
	state.messages = state.messages.filter((item) => item.id !== id);
};

onMounted(() => {
	emitter.on("flash", (alert) => {
		alert.id = uuidv4();
		state.messages.push(alert);
	});
});
</script>

<template>
	<div v-for="message in state.messages" :key="message.id">
		<flash-message :alert="message" @delete="removeFlash"></flash-message>
	</div>
</template>
