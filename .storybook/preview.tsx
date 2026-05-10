import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      enabled: true,
      story: {
        inline: true,
        iframeHeight: 600,
      },
    },
  },
};

export default preview;
