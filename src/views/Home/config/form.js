export default [{
  type: 'input',
  label: '姓名',
  key: 'name',
  attr: {
  },
  item: {
  },
},
{
  type: 'input',
  label: 'qq',
  key: 'qq',
  attr: {
  },
}, {
  type: 'select',
  label: '性别',
  key: 'gender',
  selectOptions: 'gender',
  attr: {
  },
},
{
  type: 'input',
  key: 'content',
  label: '内容',
  attr: {
    type: "textarea",
    autosize: { minRows: 4, maxRows: 4 }
  },
}, {
  type: 'date-picker',
  label: '年月日',
  key: 'ruwurq',
}, {
  type: 'date-picker',
  label: '区间',
  key: 'ruwurq2',
  attr: {
    type: 'daterange'
  },
}, {
  type: 'date-picker',
  label: '月',
  key: 'ruwurq3',
  attr: {
    type: 'month'
  },
}]