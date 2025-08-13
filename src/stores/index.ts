import { createPinia } from 'pinia'

import useFolderStore from './modules/folder'

import useSearchStore from './modules/search'

import useTorrentStore from './modules/torrent'

export {
  useFolderStore,
  useSearchStore,
  useTorrentStore,
}

const pinia = createPinia()

export default pinia
