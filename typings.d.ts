/// <reference types="@tramvai/cli" />
/// <reference types="@tramvai/test-unit-jest" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
