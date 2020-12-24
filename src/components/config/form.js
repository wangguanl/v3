export default [{
  type: 'input',
  label: '姓名',
  key: 'xingming',
  // 当前type元素的api
  attrs: {
    // readonly: true
  },
  // item的api
  items: {
  },
},
{
  type: 'input',
  label: '军人保障号',
  key: 'junrenbzh',
  attrs: {
  },
},
{
  type: 'input',
  key: 'zhengjianbh',
  label: '证件编号',
  attrs: {
    readonly: true
  },
}, {
  type: 'select',
  label: '性别',
  key: 'xingbie',
  options: 'XINGBIE',
  attrs: {
    readonly: true
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
  attrs: {
  },
}]