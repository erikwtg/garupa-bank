/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      colors: {
				"garupa": {
          500: "#4BBEA3",
        },
			},
    },
  },
  plugins: [],
}

