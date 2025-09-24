/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#00623A",
				danger: "#FF6357",
				light: {
					100: "#F6F8FA",
					200: "#E8E8E8",
					300: "#D9D9D9",
				},
				dark: {
					100: "#989898",
					200: "#8D8D8D",
					300: "#6E6E6E",
					400: "#797979",
				},
				green: {
					100: "#DCFEE7",
				},
				progress: {
					low: "#FFC46D",
					medium: "#F4D35E",
					complete: "#00623A",
				},
			},
		},
	},
	plugins: [],
};
