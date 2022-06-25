/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			colors: {
				accent: {
					900: "#52414c",
				},
			},
			screens: {
				touch: { raw: "not (hover: hover)" },
				"with-hover": { raw: "(hover: hover)" },
			},
		},
		fontFamily: {
			sans: ["Montserrat", "sans-serif"],
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
