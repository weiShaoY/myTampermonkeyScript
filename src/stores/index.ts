import { createPinia } from 'pinia'

import useEmbyStore from './modules/emby'

import useFolderStore from './modules/folder'

import useTorrentStore from './modules/torrent'

export {
  useEmbyStore,
  useFolderStore,
  useTorrentStore,
}

const pinia = createPinia()

export default pinia
