import { createPinia } from 'pinia'

import useSearchStore from './modules/search'

import useTorrentStore from './modules/torrent'

export {
  useSearchStore,
  useTorrentStore,
}

const pinia = createPinia()

export default pinia
