import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~shared': '/child-apps/holy-js-childs/shared',
      '~entities': '/child-apps/holy-js-childs/entities',
      '~features': '/child-apps/holy-js-childs/features',
      '~widgets': '/child-apps/holy-js-childs/widgets',
      '~pages': '/child-apps/holy-js-childs/pages',
      '~processes': '/child-apps/holy-js-childs/processes',
      '~app': '/child-apps/holy-js-childs/app',
    },
  },
  define: {
    'process.env': {},
  },
});
