import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configMockPlugin } from './mock'
// import { fileURLToPath, URL } from 'node:url'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import dynamicImport from 'vite-plugin-dynamic-import'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    // VITE_LEGACY,
    // VITE_BUILD_COMPRESS,
    // VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    // createSvgIconsPlugin({
    //   iconDirs: [fileURLToPath(new URL('../../../src/assets/icons', import.meta.url))],
    //   symbolId: '[name]',
    // }),
  ]
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  return vitePlugins
}
