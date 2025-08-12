import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#52B44B', // 主要颜色
      // secondary: '#FF6347', // 次要颜色
      // accent: '#32CD32', // 强调色
    },
  },
  shortcuts: {
    // 宽高 100%
    'wh-full': 'w-full h-full',

    // Flex 布局居中
    'flex-center': 'flex justify-center items-center',

    // Flex 列布局
    'flex-col': 'flex flex-col',

    // 文本溢出显示省略号
    'text-ellipsis': 'truncate',

  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
