const settings = {
  title: () => {
    return JSON.parse(sessionStorage.getItem('vuex') || '{}')?.user?.config?.design_style?.app_name  || ''
  },
  showSettings : true,
  tagsView : true,
  fixedHeader : false,
  sidebarLogo : true,
  errorLog : 'production',
}
export default settings
