import { createPinia } from 'pinia'

import useEmbyStore from './emby'

import useFolderStore from './modules/folder'

import useSearchStore from './modules/search'

import useTorrentStore from './modules/torrent'

export {
  useEmbyStore,
  useFolderStore,
  useSearchStore,
  useTorrentStore,
}

const pinia = createPinia()

export default pinia
