export const SP_PREFIX = '300' as const

export const siteList: [] = [
  {
    name: '123av',
    icon: 'blog-av-site-jable',
    hostname: '123av.com',
    url: 'https://123av.com/zh/search?keyword={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: `.detail>a[href*='v/']`,
      titleQuery: `.detail>a[href*='v/']`,
    },
  },
  {
    name: '18av',
    icon: 'blog-av-site-18av',
    hostname: '18av.mm-cg.com',
    url: 'https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.posts h3>a[href]',
      titleQuery: '.posts h3>a[href]',
    },
  },

  {
    name: 'AV01',
    icon: 'blog-av-site-av01',
    hostname: 'www.av01.tv',
    url: 'https://www.av01.tv/search/videos?search_query={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'div.well>a[href^=\'/video/\']',
      titleQuery: 'div.well>a[href^=\'/video/\']',
    },
  },
  {
    name: 'AvJoy',
    icon: 'blog-av-site-avjoy',
    hostname: 'avjoy.me',
    url: 'https://avjoy.me/search/videos/{{code}}',
    fetchType: 'parser',
    domQuery: {
      titleQuery: `#wrapper .row .content-info span.content-title`,
      linkQuery: `#wrapper .row a[href^="/video/"]`,
    },
  },
  {
    name: 'BestJP',
    icon: 'blog-av-site-bestjavporn',
    hostname: 'bestjavporn.com',
    url: 'https://www3.bestjavporn.com/search/{{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'article.thumb-block>a',
      titleQuery: 'article.thumb-block>a',
    },
  },
  {
    name: 'evojav',
    icon: 'blog-av-site-evojav',
    hostname: 'evojav.pro',
    url: 'https://evojav.pro/video/{{code}}/',
    fetchType: 'get',
    domQuery: {
    },
  },
  {
    name: 'GGJAV',
    icon: 'blog-av-site-ggjav',
    hostname: 'ggjav.com',
    url: 'https://ggjav.com/main/search?string={{code}}',
    fetchType: 'parser',
    domQuery: {
      listIndex: 1,
      titleQuery: 'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
      linkQuery: 'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
    },
  },
  {
    name: 'HAYAV',
    icon: 'blog-av-site-hayav',
    hostname: 'hayav.com',
    url: 'https://hayav.com/video/{{code}}/',
    fetchType: 'get',
    domQuery: {
    },
  },
  {
    name: 'highporn',
    icon: 'blog-av-site-highporn',
    hostname: 'highporn.net',
    url: 'https://highporn.net/search/videos?search_query={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.well>a[href]',
      titleQuery: '.well>a[href]>span.video-title',
    },
  },
  {
    name: 'Jable',
    icon: 'blog-av-site-jable',
    hostname: 'jable.tv',
    url: 'https://jable.tv/videos/{{code}}/',
    fetchType: 'get',
    domQuery: {
      subQuery: '.info-header',
      leakQuery: '.info-header',
    },
  },
  {
    name: 'JAVFC2',
    icon: 'blog-av-site-javfc2',
    hostname: 'javfc2.net',
    url: 'https://javfc2.net/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'article.loop-video>a[href]',
      titleQuery: 'article.loop-video .entry-header',
    },
  },
  {
    name: 'Jav.Guru',
    icon: 'blog-av-site-javGuru',
    hostname: 'jav.guru',
    url: 'https://jav.guru/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.imgg>a[href]',
      titleQuery: '.inside-article>.grid1 a[title]',
    },
  },

  // {
  //   name: 'JAVLib',
  //   icon: 'blog-av-site-javlib',
  //   disableLibItemName: 'javlib',
  //   hostname: 'javlibrary.com',
  //   url: 'https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}',
  //   fetchType: 'false',

  // },
  {
    name: 'JAVMENU',
    icon: 'blog-av-site-javmenu',
    hostname: 'javmenu.com',
    url: 'https://javmenu.com/{{code}}',
    fetchType: 'get',
    domQuery: {
      videoQuery: 'a.nav-link[aria-controls=\'pills-0\']',
    },
  },
  {
    name: 'JAVMOST',
    icon: 'blog-av-site-javmost',
    hostname: 'javmost.cx',
    url: 'https://javmost.cx/search/{{code}}/',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.card #myButton',
      titleQuery: '.card-block h4.card-title',
    },
  },
  {
    name: 'JavBus',
    icon: 'blog-av-site-javbus',
    hostname: 'javbus.com',
    url: 'https://javbus.com/{{code}}',
    fetchType: 'get',
    domQuery: {
    },
    codeFormater: preCode => (preCode.startsWith('MIUM') ? `${SP_PREFIX}${preCode}` : preCode),
  },
  {
    name: 'JavDB',
    icon: 'blog-av-site-javdb',
    hostname: 'javdb.com',
    url: 'https://javdb.com/search?q={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.movie-list>.item:first-child>a',
      titleQuery: '.video-title',
    },
  },
  {
    name: 'MISSAV',
    icon: 'blog-av-site-missAv',
    hostname: 'missav.ws',
    url: 'https://missav.ws/{{code}}/',
    fetchType: 'get',
    domQuery: {
      subQuery: '.space-y-2 a.text-nord13[href="https://missav.ws/chinese-subtitle"]',
      leakQuery: '.order-first div.rounded-md a[href]:last-child',
    },
  },
  {
    name: 'NETFLAV',
    icon: 'blog-av-site-netflav',
    hostname: 'netflav5.com',
    url: 'https://netflav5.com/search?type=title&keyword={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.grid_0_cell>a[href^=\'/video?\']',
      titleQuery: '.grid_0_cell>a[href^=\'/video?\'] .grid_0_title',
    },
  },

  {
    name: 'paipancon',
    icon: 'blog-av-site-paipancon',
    hostname: 'paipancon.com',
    url: 'https://paipancon.com/search/{{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'div.col>div.card>a[href]',
      titleQuery: 'div.card img.card-img-top',
    },
  },
  {
    name: 'Supjav',
    icon: 'blog-av-site-supjav',
    hostname: 'supjav.com',
    url: 'https://supjav.com/zh/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: `.posts.clearfix>.post>a.img[title]`,
      titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`,
    },
  },
]
