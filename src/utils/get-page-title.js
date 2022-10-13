import defaultSettings from '@/settings'
import store from '@/store/index'

// let t = store.state.settings.title
const title = defaultSettings.title || ''

export default function getPageTitle( pageTitle ) {
  // const title = defaultSettings.title || ''
  console.log(store.state);
  const title = store.state.settings.title || ''

  console.log("getPageTitle");
  if ( pageTitle ) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
