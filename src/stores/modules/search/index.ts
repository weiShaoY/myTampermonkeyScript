import { defineStore } from 'pinia'

import { ref } from 'vue'

const useSearchStore = defineStore(
  'search',
  () => {
    /**
     * 搜索引擎列表
     */
    const searchEngineList = ref([
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

      // {
      //   id: '11',
      //   name: '开发',
      //   siteList: [
      //     {
      //       id: '11.1',
      //       name: 'Vue',
      //       icon: 'dev-vue',
      //       hostname: 'vuejs.org',
      //       searchUrl: 'https://vuejs.org',
      //     },
      //     {
      //       id: '11.2',
      //       name: 'react',
      //       icon: 'dev-react',
      //       hostname: 'react.dev',
      //       searchUrl: 'https://react.dev',
      //     },
      //     {
      //       id: '11.3',
      //       name: 'Element Plus',
      //       icon: 'dev-elementPlus',
      //       hostname: 'element-plus.org',
      //       searchUrl: 'https://element-plus.org',
      //     },
      //   ],
      // },
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
    ])

    return {
      /**
       *  搜索引擎列表
       */
      searchEngineList,

    }
  },

)

export default useSearchStore
