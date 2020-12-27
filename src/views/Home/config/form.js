export default [{
  type: 'input',
  label: '姓名',
  key: 'xingming',
  attr: {
  },
  item: {
  },
},
{
  type: 'input',
  label: '保障号',
  key: 'jrbzh',
  attr: {
  },
},
{
  type: 'input',
  key: 'zhengjianbh',
  label: '证件编号',
  attr: {
  },
}, {
  type: 'select',
  label: '性别',
  key: 'xingbie',
  selectOptions: 'XINGBIE',
  attr: {
  },
}, {
  type: "select",
  label: '专业技术等级',
  key: "zyjsdj",
  selectOptions: 'BUKALX',
  attr: {
  },
}, {
  type: "select",
  label: '工作单位代码',
  key: "dwdm",
  selectOptions: 'DANWEI',
  attr: {
  },
}, {
  type: "select",
  label: '军种',
  key: "junzhong",
  selectOptions: 'JUNZHONG',
  attr: {
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