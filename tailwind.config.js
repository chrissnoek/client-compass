/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./src/**/*.{vue,js,ts,jsx,tsx,html}",
		"./resources/**/*.blade.php",
		"./resources/**/*.js",
		"./resources/**/*.vue",
	],
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
};
