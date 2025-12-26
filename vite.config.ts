import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
<<<<<<< HEAD
import { viteStaticCopy } from 'vite-plugin-static-copy';
=======
import { resolve } from 'path';
>>>>>>> 4108aceb0e54b73921a3c4dcbb5820bb81e8b67d

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'project/src/*.html',
          dest: '.'
        },
        {
          src: 'project/src/*.css',
          dest: '.'
        },
        {
          src: 'project/src/*.js',
          dest: '.'
        }
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auth: resolve(__dirname, 'project/src/auth.html'),
        dashboard: resolve(__dirname, 'project/src/dashboard.html'),
        gigs: resolve(__dirname, 'project/src/gigs.html'),
        'more-gigs': resolve(__dirname, 'project/src/more-gigs.html'),
        'gig-details': resolve(__dirname, 'project/src/gig-details.html'),
        apply: resolve(__dirname, 'project/src/apply.html'),
        applications: resolve(__dirname, 'project/src/applications.html'),
        profile: resolve(__dirname, 'project/src/profile.html'),
        'skill-hub': resolve(__dirname, 'project/src/skill-hub.html'),
        business: resolve(__dirname, 'project/src/business.html'),
        rights: resolve(__dirname, 'project/src/rights.html'),
        help: resolve(__dirname, 'project/src/help.html'),
        contact: resolve(__dirname, 'project/src/contact.html'),
        privacy: resolve(__dirname, 'project/src/privacy.html'),
        terms: resolve(__dirname, 'project/src/terms.html'),
        cookies: resolve(__dirname, 'project/src/cookies.html'),
      },
    },
  },
});
