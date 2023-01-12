import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
// import { configCompressPlugin } from './build/vite/plugin/compress';

import { createVitePlugins } from './build/vite/plugin'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd())

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  // 从环境变量里面取出来的布朗值会变成字符串的形式，这个方法可以把它转成布朗值
  const viteEnv = wrapperEnv(env)
  // VITE_BUILD_COMPRESS
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_OUTPUT_DIR } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root: process.cwd(),
    // 修改elements 全局样式
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/scss/index.scss" as *;`,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },
    // 预览设置
    // preview: {
    //   port: 8080,
    // },
    // 代理设置
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    ...() => {
      if (!isBuild) {
        return {
          // Dev 开发环境配置
          define: {
            __APP_ENV__: env.APP_ENV,
          },
          optimizeDeps: {
            // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
            include: [],
          },
        }
      } else {
        // command === 'build'
        return {
          build: {
            target: 'es2015',
            cssTarget: 'chrome80',
            outDir: VITE_OUTPUT_DIR,
            chunkSizeWarningLimit: 2000,
          },
          // build 打包环境配置
        }
      }
    },
  }
})
