export default [
  {
    type: 'input',
    key: 'name',
    attrs: {},
    formItem: {
      label: '姓名',
    },
  },
  {
    type: 'input',
    key: 'qq',
    attrs: {},
    formItem: {
      label: 'qq',
    }
  },
  {
    type: 'select',
    key: 'gender',
    selectOptions: 'gender',
    attrs: {},
    formItem: {
      label: '性别',
    }
  },
  {
    type: 'date-picker',
    key: 'date',
    formItem: {
      label: '年月日',
    }
  },
  {
    type: 'input',
    key: 'content',
    attrs: {
      type: "textarea",
      autosize: {
        minRows: 4, maxRows: 4
      }
    },
    formItem: {
      label: '内容',
      required: false,
    }
  },
].map(item => {
  item.formItem.required = item.formItem.hasOwnProperty('required') ? item.formItem.required : true;
  return item
})