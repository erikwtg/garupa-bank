/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  future: {
    disableExperimentalOptimizer: true, // Desativa o uso do Oxide
  },
  content: ["./index.hmtl", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-right-down': '4px 4px 12px rgba(39, 163, 223, 1)',
        'movie-green': '10px 10px 15px rgba(0, 128, 0, 0.5)',
      },
      colors: {
				"adventure-blue": {
          "light": {
						100: "#41B6EF",
					},
        },
				"accent-light": "rgb(224, 204, 250)",
				"accent-dark": "rgb(49, 10, 101)",
				"black-400": "#0A0A0A",
			},
    },
  },
  plugins: [],
}

