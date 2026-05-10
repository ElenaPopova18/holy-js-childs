import { createChildApp } from '@tramvai/child-app-core';
import { BigConfMf } from './components/root';

// eslint-disable-next-line import/no-default-export
export default createChildApp({
  name: 'big-conf-mf',
  render: BigConfMf,
  providers: [],
});
