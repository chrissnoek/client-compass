<template>
	<section class="text-gray-600 body-font">
		<div
			class="container mx-auto flex px-5 py-24 items-center justify-center flex-col"
		>
			<div class="text-center lg:w-2/3 w-full">
				<h1
					class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"
				>
					Your activation email has been sent!
				</h1>
				<p class="mb-8 leading-relaxed">
					Please check your email to set your password and finish your
					account creation!
				</p>
				<div class="flex justify-center">
					<a
						href="/"
						class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
					>
						Back to home
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { LockClosedIcon, XIcon } from "@heroicons/vue/solid";
</script>
