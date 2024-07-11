const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      switch: {
        '0%': { transform: 'rotate(0deg)', opacity: 0 },
        '100%': { transform: 'rotate(180deg)', opacity: 1 },
      },
    },
  },
  plugins: [],
};
