export default () => ({
  gender: {
    type: 'select',
    selectOptions: 'gender',
    attrs: {
    },
    formItem: {
      label: '性别',
    },
  },
  qq: {
    type: 'input',
    attrs: {
    },
    formItem: {
      label: 'qq',
    },

  },
  name: {
    type: 'input',
    attrs: {
      required: true,
      rules: [],
    },
    formItem: {
      label: '姓名',
    },
  },
});