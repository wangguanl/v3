import page from '@/views/components'
const EForm = () => new Promise((resolve) => import('@/views/components/eForm').then((item) => resolve(item)))
const items = () => new Promise((resolve) => import('@/views/components/items').then((item) => resolve(item)))
const history = () => new Promise((resolve) => import('@/views/components/history').then((item) => resolve(item)))
const files = () => new Promise((resolve) => import('@/views/components/files').then((item) => resolve(item)))
const components = {
  comPage: page,
  comEForm: EForm,
  comItems: items,
  comFiles: files,
  comHistory: history
}
export default {
  data() {
    return {
      dialog: {
        visible: false,
        title: "",
        width: "",

        // dialog内组件的名称
        name: '',
        // dialog组件的数据
        datas: {}
      },
    }
  },
  methods: {
    /* 头部按钮调用 */
    // 导入
    _useHeadBtnImport(parmas) {
      console.log(parmas)
    },
    // 导出
    _useHeadBtnExport(parmas) {
      console.log(parmas)
    },

    /* eForm组件 */
    //关闭
    onSubmit() {
      console.log(456)
      this.dialog = {
        visible: false,
      }
      this.$refs.comPage.useGetTableData();
    },
    onCancel() {
      this.dialog = {
        visible: false,
      }
    }
  },
  components
}