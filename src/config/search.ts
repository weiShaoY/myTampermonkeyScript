/**
 * 搜索引擎列表
 */
export const searchEngineList = [
  {
    name: 'Google',
    icon: 'google',
    hostname: 'google.com',
    textareaId: 'APjFqb',
    searchUrl: 'https://www.google.com/search?q=',
  },
  {
    name: 'Baidu',
    icon: 'baidu',
    hostname: 'baidu.com',
    textareaId: 'chat-textarea',
    searchUrl: 'https://www.baidu.com/s?wd=',
  },

  {
    name: '开发',
    siteList: [
      {
        name: '稀土掘金',
        icon: 'dev-jueJin',
        hostname: 'juejin.cn',
        textareaClass: 'input.search-input',
        searchUrl: 'https://juejin.cn/search?query=',
      },
      {
        name: 'Csdn',
        icon: 'dev-csdn',
        hostname: 'csdn.net',
        textareaId: 'keyword',
        searchUrl: 'https://so.csdn.net/so/search?q=',
      },
      {
        name: 'Iconfont',
        icon: 'dev-iconfont',
        hostname: 'iconfont.cn',
        textareaId: 'J_suggest_input',
        searchUrl: 'https://www.iconfont.cn/search/index?q=',
      },
    ],
  },

  {
    name: '成人',
    siteList: [
      {
        name: 'javdb',
        icon: 'av-javdb',
        hostname: 'javdb.com',
        textareaId: 'video-search',
        searchUrl: 'https://javdb.com/search?q=',
      },
      {
        name: 'missav',
        icon: 'av-missav',
        hostname: 'missav.ws',
        textareaClass: 'input.text-nord9',
        searchUrl: 'https://missav.ws/search/',
      },
      {
        name: 'javbus',
        icon: 'av-javbus',
        hostname: 'javbus.com',
        textareaClass: 'input.form-control',
        searchUrl: 'https://www.javbus.com/search/',
      },
      {
        name: 'btsow',
        icon: 'av-btsow',
        hostname: 'btsow.com',
        textareaId: 'search-input',
        searchUrl: 'https://btsow.com',
      },
    ],
  },
]
