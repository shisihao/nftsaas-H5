import store from '@/store/index'

export default function getPageTitle( pageTitle ) {
  const title = store.state.settings.title || ''
  if ( pageTitle ) {
    return `${pageTitle} ${title ? '-' : ''} ${title}`
  }
  return `${title}`
}
