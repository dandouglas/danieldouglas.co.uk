import { setPluginConfig, ScullyConfig, prod } from '@scullyio/scully';
import { GoogleAnalytics } from '@scullyio/scully-plugin-google-analytics';
import '@scullyio/scully-plugin-puppeteer';

const defaultPostRenderers = [];

if (prod) {
  setPluginConfig(GoogleAnalytics, { globalSiteTag: 'UA-199281301-1' });
  defaultPostRenderers.push(GoogleAnalytics);
}

export const config: ScullyConfig = {
  defaultPostRenderers,
  projectRoot: './src',
  projectName: 'danieldouglas',
  outDir: './dist/static',
  routes: {
    '/': {
      type: 'contentFolder',
      postRenderers: [...defaultPostRenderers],
    },
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog',
      },
    },
  },
  puppeteerLaunchOptions: {
    args: ['--no-sandbox', '--disable-setuid--sandbox'],
    executablePath: '/usr/bin/google-chrome'
  },
};
