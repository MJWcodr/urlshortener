// craco.config.js
const purgecss = require('postcss-purgecss');


module.exports= {
  style: {
  postcss: {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  },
},
};