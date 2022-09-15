/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{vue,js,ts,jsx,tsx,html}",
		"./resources/**/*.blade.php",
		"./resources/**/*.js",
		"./resources/**/*.vue",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
};
