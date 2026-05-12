import { createChildApp } from '@tramvai/child-app-core';
import { RootCmp } from './components/root';

export default createChildApp({
  name: 'holy-js-childs',
  render: RootCmp,
  providers: [],
});
