<script setup>
import "flowbite";
import { onMounted } from "vue";

onMounted(() => {
	axios
		.get("http://client-compass.test/sanctum/csrf-cookie")
		.then((response) => {});
});
</script>

<template>
	<router-view></router-view>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
