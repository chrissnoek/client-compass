<script setup>
import "flowbite";
import { onMounted } from "vue";
import FlashMessageContainer from "./components/FlashMessageContainer.vue";
import { useUserStore } from "./store/user";

const userStore = useUserStore();

onMounted(() => {
	axios
		.get("http://client-compass.test/sanctum/csrf-cookie")
		.then((response) => {});

	userStore.fetch();
});
</script>

<template>
	<div class="absolute bottom-4 right-4">
		<flash-message-container></flash-message-container>
	</div>
	<router-view></router-view>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
