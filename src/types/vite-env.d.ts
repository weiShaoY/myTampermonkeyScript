// / <reference types="vite/client" />

declare module 'virtual:svg-icons-register' {
  const content: any
  export default content
}

/**
 * alias of vite-plugin-monkey/dist/client
 */
declare module '$' {
  export * from 'vite-plugin-monkey/dist/client'
}
