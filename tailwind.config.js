export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: '#5a0f1c',
        darkwine: '#3d0711',
        deepwine: '#230307',
        rosegold: '#b76e5a',
        paper: '#f6ece5',
        gold: '#c59b57',
        goldlight: '#e8c992',
      },
      fontFamily: {
        script: ['"Pinyon Script"', '"Great Vibes"', '"Alex Brush"', 'cursive'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
      },
    },
  },
  plugins: [],
}
