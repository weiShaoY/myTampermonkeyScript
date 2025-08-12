import { createPinia } from 'pinia'

import useSearchStore from './modules/search'

export {
  useSearchStore,
}

const pinia = createPinia()

export default pinia
