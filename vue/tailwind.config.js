/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{vue,js,ts,jsx,tsx,html}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
};
