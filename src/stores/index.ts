import { createPinia } from 'pinia'

import useEmbyStore from './modules/emby'

import useFolderStore from './modules/folder'

import useOnlinePlayStore from './modules/onlinePlay'

import useSearchStore from './modules/search'

import useTorrentStore from './modules/torrent'

export {
  useEmbyStore,
  useFolderStore,
  useOnlinePlayStore,
  useSearchStore,
  useTorrentStore,
}

const pinia = createPinia()

export default pinia
