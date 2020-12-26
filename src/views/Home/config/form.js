export default [{
  type: 'input',
  label: '姓名',
  key: 'xingming',
  attrs: {
    required: true,
    rules: [],
  },
  items: {
  },
},
{
  type: 'input',
  label: '保障号',
  key: 'jrbzh',
  attrs: {
  },
},
{
  type: 'input',
  key: 'zhengjianbh',
  label: '证件编号',
  attrs: {
  },
}, {
  type: 'select',
  label: '性别',
  key: 'xingbie',
  options: 'XINGBIE',
  attrs: {
  },
}, {
  type: "select",
  label: '专业技术等级',
  key: "zyjsdj",
  options: 'BUKALX',
  attrs: {
  },
}, {
  type: "select",
  label: '工作单位代码',
  key: "dwdm",
  options: 'DANWEI',
  attrs: {
  },
}, {
  type: "select",
  label: '军种',
  key: "junzhong",
  options: 'JUNZHONG',
  attrs: {
  },
}, {
  type: 'date-picker',
  label: '年月日',
  key: 'ruwurq',
}, {
  type: 'date-picker',
  label: '区间',
  key: 'ruwurq2',
  attrs: {
    type: 'daterange'
  },
}, {
  type: 'date-picker',
  label: '月',
  key: 'ruwurq3',
  attrs: {
    type: 'month'
  },
}]