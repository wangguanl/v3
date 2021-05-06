import {
  ElButton,
  ElIcon,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElUpload,
  ElDialog,
  ElImage,
  ElImageViewer,
  ElSubmenu,
  ElMenuItem,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElScrollbar,
  ElMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElPagination,
  ElMessageBox,
  ElMessage,
  ElNotification,
  ElLoading,
} from "element-plus";
const Components = [
  ElButton,
  ElIcon,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElUpload,
  ElDialog,
  ElImage,
  ElImageViewer,
  ElSubmenu,
  ElMenuItem,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElScrollbar,
  ElMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElPagination,
];
ElDialog.props.closeOnClickModal.default = false;
const Plugins = [ElMessageBox, ElMessage, ElNotification, ElLoading];
export default {
  install(app, options = {}) {
    Components.forEach((component) => app.component(component.name, component));
    Plugins.forEach((plugin) => {
      app.use(plugin);
      if (plugin.name) {
        app.config.globalProperties[plugin.name] = plugin;
      }
    });
  },
};
