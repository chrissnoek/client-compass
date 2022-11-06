<template>
	<aside class="w-64 h-full" aria-label="Sidenav">
		<div
			class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
		>
			<ul class="space-y-2">
				<li v-for="item in navigation" :key="item.name">
					<router-link
						:to="item.to"
						:class="[
							this.$route.name !== item.to.name
								? ''
								: 'bg-gray-100 ',
							'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group',
						]"
						:aria-current="
							this.$route.name === item.to.name
								? 'page'
								: undefined
						"
					>
						<component
							:is="item.icon"
							aria-hidden="true"
							:class="[
								this.$route.name !== item.to.name
									? ''
									: ' text-purple-500',
								'w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white',
							]"
						></component>
						<span class="ml-3">{{ item.name }}</span></router-link
					>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script setup>
import {
	BuildingOfficeIcon,
	UserGroupIcon,
	BeakerIcon,
} from "@heroicons/vue/24/outline";

const navigation = [
	{
		name: "Dashboard",
		to: { name: "Dashboard" },
		current: true,
		icon: BuildingOfficeIcon,
	},
	{
		name: "Clients",
		to: { name: "ClientIndex" },
		current: false,
		icon: UserGroupIcon,
	},
	{
		name: "Workflows",
		to: { name: "WorkflowIndex" },
		current: false,
		icon: BeakerIcon,
	},
];
</script>
