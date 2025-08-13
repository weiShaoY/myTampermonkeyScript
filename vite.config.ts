import path from 'node:path'

import vue from '@vitejs/plugin-vue'

import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'

import { defineConfig, loadEnv } from 'vite'

import monkey, { cdn, util } from 'vite-plugin-monkey'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { logoBase64 } from './src/assets/logoBase64'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as any

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      UnoCSS(),

      // 自动导入配置
      AutoImport(
        {
          imports: [util.unimportPreset, 'vue', 'pinia'],

          resolvers: [
          // 自动导入 Element Plus 的组件
            ElementPlusResolver({
              importStyle: false, // 禁用自动导入样式
            }),
          ],

          // 自动导入的目录
          dirs: [
            'src/composables',
            'src/stores',
            'src/utils',
          ],

          // 生成 TypeScript 自动导入声明文件
          dts: 'src/types/auto-imports.d.ts',

          vueTemplate: true, // 启用 Vue 模板

          // 自动生成 ESLint 配置
          eslintrc: {
            enabled: true,
          },
        },
      ),

      // https://github.com/antfu/vite-plugin-components
      // 组件自动导入配置
      Components({
      // 生成 TypeScript 组件声明文件
        dts: 'src/types/components.d.ts',
        resolvers: [
        // 使用 Sass 引入 Element Plus 样式
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),

      // SVG 图标插件配置
      createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
        symbolId: `${env.VITE_APP_ICON_PREFIX || 'icon'}-[dir]-[name]`,
      }),

      monkey({
        build: {
          externalGlobals: {
            vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          },
        },
        entry: 'src/main.ts',
        userscript: {
          // icon: 'https://vitejs.dev/logo.svg',
          icon: logoBase64,
          name: '油猴自用脚本',
          author: 'weiShao',
          namespace: 'npm/vite-plugin-monkey',

          // match: ['https://www.google.com/'],

          grant: ['GM_xmlhttpRequest', 'GM_openInTab'],

          // 包含的 URL 模式
          include: [

            // '*/site/index.html',
            '*://192.168.0.*',

            '*://*.google.com/*',
            '*://google.com/*',

            '*://*.baidu.com/*',
            '*://baidu.com/*',

            // BAIDU:
            'https://*.baidu.com/*',
            'https://baidu.com/*',
            'http://*.baidu.com/*', // Added HTTP
            'http://baidu.com/*', // Added HTTP

            // //////////////////  开发  //////////////////
            '*://*.juejin.cn/*',
            '*://juejin.cn/*',

            '*://*.csdn.net/*',
            '*://csdn.net/*',

            '*://*.iconfont.cn/*',
            '*://iconfont.cn/*',

            // //////////////////  购物  //////////////////

            '*://*.jd.com/*',
            '*://jd.com/*',

            '*://*.taobao.com/*',
            '*://taobao.com/*',

            '*://*.goofish.com/*',
            '*://goofish.com/*',

            // //////////////////  成人  //////////////////
            '*://*.javdb.com/*', // 子域名
            '*://javdb.com/*', // 主域名

            '*://*.missav.ws/*', // 子域名
            '*://missav.ws/*', // 主域名

            '*://*.javbus.com/*',
            '*://javbus.com/*',
          ],

          /**
           *  此标签定义允许通过GM_xmlhttpRequest检索的域（无顶级域），包括子域
           */
          connect: [
            '192.168.*',
            '192.168.0.4:8096',
            'jable.tv',
            'missav.com',
            'missav.ws',
            'missav123.com',
            'njav.tv',
            'supjav.com',
            'netflav5.com',
            'avgle.com',
            'javhhh.com',
            'bestjavporn.com',
            'javmenu.com',
            'jav.guru',
            'javmost.cx',
            'hayav.com',
            'avjoy.me',
            'javfc2.net',
            'paipancon.com',
            'ggjav.com',
            'www.av01.tv',
            '18sex.org',
            'highporn.net',
            'evojav.pro',
            '18av.mm-cg.com',
            'javgo.to',
            'javbus.com',
            'javdb.com',
            'javlibrary.com',
            'javdb008.com',
            'g64w.com',
            '*',
          ],
        },

      }),

    ],
  }
})
