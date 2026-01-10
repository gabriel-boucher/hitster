/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST_IS_PROD: boolean
    readonly VITE_HOST_DEV: string
    readonly VITE_HOST_PROD: string
    readonly VITE_CLIENT_PORT: string
    readonly VITE_SOCKET_SERVER_PORT: string
    readonly VITE_HTTP_SERVER_PORT: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  } 