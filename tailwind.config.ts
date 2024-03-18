import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graybg: '#E2E4F3',
        purple1: '#2e3152',
        purple2: '#343964',
        purple3: '#393F6E',
        gradientColor1: '#E65895',
        gradientColor2: '#BC6BE8',
        wrongAnswer: '#DD524C',
        correctAnswer: '#3E9FFF',
        fontColor: '#8B8EAB',
        congratsColor: '#FFECC8'
      },
      backgroundImage: {
         'bg-image': "url('/img/bg.jpg')",
        }
    },
  },
  plugins: [],
};
export default config;
