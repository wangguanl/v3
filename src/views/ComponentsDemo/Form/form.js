const obj = {
  formItem: { label: '多选' },
  value: [
    {
      key: 'switch',
      type: 'input',
      attrs: {
        placeholder: '请输入'
      },
      formItem: {
      }
    },
    {
      key: 'date',
      type: 'date-picker',
      attrs: {
        placeholder: '请选择年月日'
      },
      formItem: {
      }
    }]
};
const options = [
  [
    {
      key: 'name',
      type: 'input',
      attrs: {},
      formItem: {
        label: '姓名',
      },
    }, {
      key: 'qq',
      type: 'input',
      attrs: {},
      formItem: {
        label: 'qq',
      }
    },
    {
      key: 'gender',
      type: 'select',
      selectOptions: 'gender',
      attrs: {},
      formItem: {
        label: '性别',
      }
    },
  ],
  [
    {
      key: 'gender2',
      type: 'select',
      selectOptions: 'gender',
      attrs: {},
      formItem: {
        label: '性别2',
      }
    },
    obj,
  ],
  [obj, null],
  {
    key: 'content',
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
];
((OPTIONS) => {
  (function ParsingComplex(complexTypes) {
    complexTypes.forEach(cpx => {
      if (Array.isArray(cpx)) {
        ParsingComplex(cpx);
      } else {
        if (cpx) {
          cpx.formItem = cpx.formItem || {};
          cpx.formItem.required = cpx.formItem.hasOwnProperty('required') ? cpx.formItem.required : true
          cpx.value && ParsingComplex(cpx.value);
        }
      }

    })
  })(OPTIONS);
})(options)
export default () => options;
