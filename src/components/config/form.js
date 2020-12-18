export default [{
    type: 'input',
    // 当前type元素的api
    attrs: {
      key: 'xingming',
      label: '姓名',
      // readonly: true
    },
    // item的api
    items: {},
  },
  {
    type: 'input',
    attrs: {
      label: '军人保障号',
      key: 'junrenbzh',
    },
  },
  {
    type: 'input',
    attrs: {
      key: 'zhengjianbh',
      label: '证件编号',
      readonly: true
    },
  }, {
    type: 'select',
    attrs: {
      label: '性别',
      key: 'xingbie',
      readonly: true
    },
    options: 'XINGBIE',
  }, {
    type: "select",
    attrs: {
      label: '专业技术等级',
      key: "zyjsdj"
    },
    options: 'BUKALX',
  }, {
    type: "select",
    attrs: {
      label: '工作单位代码',
      key: "dwdm"
    },
    options: 'DANWEI'
  }, {
    type: "select",
    attrs: {
      label: '军种',
      key: "junzhong"
    },
    options: 'JUNZHONG',
  }, {
    type: 'date-picker',
    attrs: {
      label: '年月日',
      key: 'ruwurq',
    },
  },
]