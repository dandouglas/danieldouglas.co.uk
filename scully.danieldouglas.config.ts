import { setPluginConfig, ScullyConfig, prod } from '@scullyio/scully';
import { GoogleAnalytics } from '@scullyio/scully-plugin-google-analytics';

const defaultPostRenderers = [];

if (prod) {
  setPluginConfig(GoogleAnalytics, { globalSiteTag: 'G-K3PYY83029' });
  defaultPostRenderers.push(GoogleAnalytics);
}

export const config: ScullyConfig = {
  defaultPostRenderers,
  projectRoot: "./src",
  projectName: "danieldouglas",
  outDir: './dist/static',
  routes: {
    '/': {
      type: 'contentFolder',
      postRenderers: [...defaultPostRenderers],
    },
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};
