// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     "@tailwindcss/postcss": {},
//   },
// }
// module.exports = {
//   plugins: [
//     require('@tailwindcss/postcss')({
//       // optional: pass your Tailwind config file if needed
//       config: './tailwind.config.js',
//     }),
//     require('autoprefixer'),
//   ],
// };
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};