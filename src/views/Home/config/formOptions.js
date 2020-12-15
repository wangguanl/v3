export default [
  [{
    label: '姓名',
    type: 'input',
    key: 'xingming',
    attrs: {
      readonly: true
    },
    rules: true
  },
  {
    label: '性别',
    type: 'select',
    key: 'xingbie',
    options: 'XINGBIE',
    attrs: {
      readonly: true
    },
    rules: true
  }
  ],
  [{
    label: '军人保障号',
    type: 'input',
    key: 'junrenbzh',
    attrs: {
      readonly: true
    },
    rules: true
  }, {
    label: '保障卡号',
    type: 'input',
    key: 'baozhangkh',
    attrs: {
      readonly: true
    },
    rules: true
  }],
  [{
    label: '卡类型',
    type: 'input',
    key: 'kaleixing',
    attrs: {
      readonly: true
    },
    rules: true
  }, {
    label: '是否已制卡',
    type: 'select',
    key: 'shifouyzk',
    options: 'ENUM',
    attrs: {
      readonly: true
    },
    rules: true
  }],
  [{
    label: '医疗卡号',
    type: 'input',
    key: 'yiliaokh',
    attrs: {
      readonly: true
    },
    rules: true
  }, {
    label: '医疗账号',
    type: 'input',
    key: 'yiliaozh',
    attrs: {
      readonly: true
    },
    rules: true
  }],
  [{
    label: '士官注册码',
    type: 'input',
    key: 'shibingzcm',
    attrs: {
      readonly: true
    },
    rules: true
  }, {
    label: '士兵服装登记码',
    type: 'input',
    key: 'shibingfzdjbhm',
    attrs: {
      readonly: true
    },
    rules: true
  }],
  [{
    label: '民族',
    type: 'input',
    key: 'minzu'
  }, {
    label: '籍贯',
    type: 'input',
    key: 'jiguan'
  }],
  [{
    label: '出生地',
    type: 'input',
    key: 'chushengdi'
  }, {
    label: '出生日期',
    type: 'date-picker',
    key: 'chushengrq'
  }],
  [{
    label: '血型',
    type: 'input',
    key: 'xuexing'
  },
  {
    label: '工作日期',
    type: 'date-picker',
    key: 'gongzuorq'
  }
  ],
  [{
    label: '离退休日期',
    type: 'date-picker',
    key: 'lituixrq'
  }, {
    label: '工作单位代码',
    type: 'input',
    key: 'gongzuodwdm'
  }],
  [{
    label: '工作单位名称',
    type: 'input',
    key: 'gongzuodwmc'
  }, {
    label: '部别',
    type: 'input',
    key: 'bubie'
  }],
  [{
    label: '部门ID',
    type: 'input',
    key: 'bumenid'
  }, {
    label: '主类别',
    type: 'select',
    key: 'zhuleibie',
    options: 'ZHULEIBIE'
  }],
  [{
    label: '军种',
    type: 'select',
    key: 'junzhong',
    options: 'JUNZHONG'
  }, {
    label: '入伍时间',
    type: 'date-picker',
    key: 'ruwurq',
    attrs: {
      readonly: true
    }
  }],
  [{
    label: '证件类型',
    type: 'input',
    key: 'zhengjianlx',
    attrs: {
      readonly: true
    }
  }, {
    label: '证件编号',
    type: 'input',
    key: 'zhengjianbh',
    attrs: {
      readonly: true
    }
  }],
  [{
    label: '人员类别',
    type: 'select',
    key: 'renyuanlb',
    options: 'RENYUANLB'
  },/*  {
    label: '有否照片',
    type: 'select',
    key: 'youfouzp',
    options: 'ENUM'
  } */],
  [{
    label: '职工身份类别',
    type: 'select',
    key: 'zhigongsflb',
    options: 'ZHIGONGSFLB'
  }, {
    label: '家属身份类别',
    type: 'select',
    key: 'jiashusflb',
    options: 'JIASHUSFLB'
  }],
  [{
    label: '文化程度',
    type: 'select',
    key: 'wenhuacd',
    options: 'WENHUACD'
  }, {
    label: '毕业院校',
    type: 'input',
    key: 'biyeyx'
  }],
  [{
    label: '入学日期',
    type: 'date-picker',
    key: 'ruxuerq'
  }, {
    label: '毕业日期',
    type: 'date-picker',
    key: 'biyerq'
  }],
  [{
    label: '毕业专业',
    type: 'input',
    key: 'biyezy'
  }, {
    label: '学位',
    type: 'input',
    key: 'xuewei'
  }],
  [{
    label: '政治面貌',
    type: 'select',
    key: 'zhengzhimm',
    options: 'ZHENGZHIMM'
  }, {
    label: '选改士官日期',
    type: 'date-picker',
    key: 'gaixuansgrq'
  }],
  [{
    label: '军衔文职级',
    type: 'input',
    key: 'junxianwzj'
  }, {
    label: '现军衔文职级日期',
    type: 'date-picker',
    key: 'xianjunxwzjrq'
  }],
  [{
    label: '行政职务',
    type: 'input',
    key: 'xingzhengzw'
  }, {
    label: '现行政职务日期',
    type: 'date-picker',
    key: 'xianxingzzwrq'
  }],
  [{
    label: '行政职务等级',
    type: 'input',
    key: 'xingzhengzwdj'
  }, {
    label: '现行行政职务等级日期',
    type: 'date-picker',
    key: 'xianxingzzwdjrq'
  }],
  [{
    label: '专业技术职务',
    type: 'input',
    key: 'zhuanyejszw'
  }, {
    label: '专业技术职务日期',
    type: 'date-picker',
    key: 'zhuanyejszwrq'
  }],
  [{
    label: '专业技术等级',
    type: 'input',
    key: 'zhuanyejsdj'
  }, {
    label: '专业技术等级日期',
    type: 'date-picker',
    key: 'zhuanyejsdjrq'
  }],
  [{
    label: '后勤干部专业类别',
    type: 'input',
    key: 'houqingbzylb',
    // options: ''
  }, {
    label: '机关分队标识',
    type: 'input',
    key: 'jiguanfdbs'
  }],
  [{
    label: '是否军人家属',
    type: 'select',
    key: 'shifoujrjs',
    options: 'ENUM'
  }, {
    label: '家属工作单位',
    type: 'input',
    key: 'jiashugzdw'
  }],
  [{
    label: '婚姻状况',
    type: 'input',
    key: 'hunyinzk'
  }, {
    label: '配偶姓名',
    type: 'input',
    key: 'peiouxm'
  }],
  [{
    label: '配偶工作单位',
    type: 'input',
    key: 'peiougzdw'
  }, {
    label: '是否遗属',
    type: 'select',
    key: 'shifouys',
    options: 'ENUM'
  }],
  [{
    label: '对应职工/军人ID',
    type: 'input',
    key: 'duiyingjrzgid'
  }, {
    label: '对应军人姓名',
    type: 'input',
    key: 'duiyingjrxm'
  }],
  [{
    label: '对应军人保障号',
    type: 'input',
    key: 'duiyingjrbzh'
  }, {
    label: '对应军人证件编号',
    type: 'input',
    key: 'duiyingjrzjbh'
  }],
  [{
    label: '是否符合远离军队医疗机构条件',
    type: 'select',
    key: 'shifoufhyljdyljgtj',
    options: 'ENUM'
  }, {
    label: '基层医疗机构ID',
    type: 'input',
    key: 'jicengyljgid'
  }],
  [{
    label: '基层医疗机构名称',
    type: 'input',
    key: 'jicengyljgmc'
  }, {
    label: '经济状况',
    type: 'input',
    key: 'jingjizk'
  }],
  [{
    label: '联系电话',
    type: 'input',
    key: 'lianxidh'
  }, {
    label: '个人状态',
    type: 'input',
    key: 'gerenzt'
  }],
  [{
    label: '一类特供人员类别',
    type: 'select',
    key: 'yileitgrylb',
    options: 'YILEITGRYLB'
  }, {
    label: '二类特供人员类别',
    type: 'select',
    key: 'erleitgrylb',
    options: 'ERLEITGRYLB'
  }],
  [{
    label: '三类特供人员类别',
    type: 'select',
    key: 'sanleitgrylb',
    options: 'SANLEITGRYLB'
  }, {
    label: '四类特供人员类别',
    type: 'select',
    key: 'sileitgrylb',
    options: 'SILEITGRYLB'
  }],
  [{
    label: '五类特供人员类别',
    type: 'select',
    key: 'wuleitgrylb',
    options: 'WULEITGRYLB'
  }, {
    label: '采集上报日期',
    type: 'date-picker',
    key: 'shangbaobz'
  }],
  [{
    label: '备注',
    type: 'input',
    key: 'beizhu',
    attrs: {
      type: 'textarea'
    }
  }],
  [{
    label: '下发标志',
    type: 'input',
    key: 'xiafabz',
    // options: ''
  }, {
    label: '人员基本信息采集依据',
    type: 'input',
    key: 'renyuanjbxxcjyj'
  }],
  [{
    label: '顺序码',
    type: 'input',
    key: 'shunxum'
  }, {
    label: '职工登记号码',
    type: 'input',
    key: 'zhigongdjhm'
  }],
  [{
    label: '原军人ID',
    type: 'input',
    key: 'yuanid'
  }, {
    label: '银行代码',
    type: 'input',
    key: 'yinhangdm'
  }],
  [{
    label: '银行所在地',
    type: 'input',
    key: 'yinhangszd'
  }, {
    label: '银行卡号',
    type: 'input',
    key: 'yinhangkh'
  }],
  [{
    label: '岗位等级',
    type: 'input',
    key: 'gangweidj'
  }, {
    label: '岗位情况',
    type: 'input',
    key: 'gangweiqk'
  }],
  [{
    label: '参加医疗保险情况',
    type: 'input',
    key: 'canjiaylbxqk'
  }],
  [{
    label: '行政关系所在单位名称',
    type: 'input',
    key: 'xzgxdwmc'
  }, {
    label: '行政关系所在单位代码',
    type: 'input',
    key: 'xzgxddxh'
  }],
  [{
    label: '财务关系所在单位名称',
    type: 'input',
    key: 'cwgxdwmc'
  }, {
    label: '财务关系所在单位代码',
    type: 'input',
    key: 'cwgxdwdm'
  }],
  [{
    label: '医疗关系所在单位代码',
    type: 'input',
    key: 'ylgxdwdm'
  }, {
    label: '医疗关系所在单位名称',
    type: 'input',
    key: 'ylgxdwmc'
  }],
  [{
    label: '被装关系所在单位名称',
    type: 'input',
    key: 'bzgxdwmc'
  }, {
    label: '被装关系所在单位代码',
    type: 'input',
    key: 'bzgxdwdm'
  }],
  [{
    label: '营房关系所在单位代码',
    type: 'input',
    key: 'yfgxdwdm'
  }, {
    label: '营房关系所在单位名称',
    type: 'input',
    key: 'yfgxdwmc'
  }],
  [{
    label: '所在气候区',
    type: 'input',
    key: 'suozaiqhq'
  }],
  [{
    label: '是否在校学员',
    type: 'select',
    key: 'shifouzxxy',
    options: 'ENUM'

  }, {
    label: '工勤技能等级日期',
    type: 'input',
    key: 'gongqinjndjrq'
  }],
  [{
    label: '在职情况',
    type: 'input',
    key: 'zaizhiqk',
    // options: ''
  }, {
    label: '审核人',
    type: 'input',
    key: 'shenheren'
  }],
  [{
    label: '行政命令号',
    type: 'input',
    key: 'xingzhengmlh'
  }, {
    label: '批准人',
    type: 'input',
    key: 'pizhunren'
  }],
  [{
    label: '批准人日期',
    type: 'date-picker',
    key: 'pizhunrq'
  }, /* {
    label: '照片是否修改',
    type: 'select',
    key: 'zhaopiansfxg',
    options: 'ENUM'
  } */],
  [{
    label: '部门审核状态',
    type: 'input',
    key: 'bumenshzt',
    // options: ''
  }, {
    label: '工资列支渠道',
    type: 'input',
    key: 'gongzilzqd'
  }],
  [{
    label: '采集上报单位',
    type: 'input',
    key: 'caijisbdw'
  }, {
    label: '是否享有随军配偶保险',
    type: 'select',
    key: 'shifouxysjpobx',
    options: 'ENUM'
  }]
]
