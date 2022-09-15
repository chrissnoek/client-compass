<template>
	<div>
		<article>
			<section :class="animation">
				<h2>{{ formGroup[formPosition].title }}</h2>
				<div>
					<div
						v-for="(field, index) in formGroup[formPosition].fields"
						:key="'field' + index"
					>
						<input type="text" v-model="field.value" required />
						<label>{{ field.label }}</label>
					</div>
				</div>
				<button
					v-if="formPosition + 1 < formGroup.length - 1"
					@click="nextStep"
				>
					Next
				</button>
				<button v-if="formPosition + 1 === formGroup.length - 1">
					Enter
				</button>
			</section>
			<footer class="flex">
				<div
					:class="[
						{ 'bg-blue-200 text-blue-500': index === formPosition },
						'bg-gray-200 text-gray-500 rounded-full p-1 w-1/3 h-1 text-center mr-2 hover:bg-gray-300 hover:text-gray-600 cursor-pointer',
					]"
					v-for="(step, index) in formGroup"
					:key="'step' + index"
					@click="formPosition = index"
				></div>
			</footer>
		</article>
	</div>
</template>
<script>
export default {
	data: () => {
		return {
			formPosition: 0,
			animation: "animate-in",
			formGroup: [
				{
					title: "Personal Details",
					fields: [
						{ label: "First Name", value: "" },
						{ label: "Second Name", value: "" },
						{ label: "Age", value: "" },
					],
				},
				{
					title: "Address",
					fields: [
						{ label: "City", value: "" },
						{ label: "Zip Code", value: "" },
						{ label: "County", value: "" },
						{ label: "State", value: "" },
					],
				},
				{
					title: "Academic Details",
					fields: [
						{ label: "Academic qualification", value: "" },
						{ label: "College Attended", value: "" },
						{ label: "Year of completion", value: "" },
					],
				},
			],
		};
	},
	methods: {
		nextStep() {
			this.animation = "animate-out";
			setTimeout(() => {
				this.animation = "animate-in";
				this.formPosition += 1;
			}, 600);
		},
	},
};
</script>
<style>
.animation-in {
	transform-origin: left;
	animation: in 0.6s ease-in-out;
}
.animation-out {
	transform-origin: bottom left;
	animation: out 0.6s ease-in-out;
}
</style>
