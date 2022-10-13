import store from '@/store/index'

const settings = {
  // title : JSON.parse(sessionStorage.getItem('vuex') || '{}')?.user?.config?.design_style?.app_name,
  title : store.state.settings.title || '',
  showSettings : true,
  tagsView : true,
  fixedHeader : false,
  sidebarLogo : true,
  errorLog : 'production'
}

export default settings
