export default () => {
  const obj = {
    name: {
      type: 'input',
      attrs: {},
      formItem: {
        label: '姓名',
      },
    },
    qq: {
      type: 'input',
      attrs: {},
      formItem: {
        label: 'qq',
      }
    },
    gender: {
      type: 'select',
      selectOptions: 'gender',
      attrs: {},
      formItem: {
        label: '性别',
      }
    },
    date: {
      type: 'date-picker',
      formItem: {
        label: '年月日',
      }
    },
    content: {
      type: 'input',
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
  }
  for (let key in obj) {
    obj[key].formItem.required = obj[key].formItem.hasOwnProperty('required') ? obj[key].formItem.required : true
  }
  return obj
};
