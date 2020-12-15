export default [
  [{
    label: '姓名',
    key: 'xingming',
  },
  {
    label: '性别',
    key: 'xingbie',
    options: 'XINGBIE',
  }
  ],
  [{
    label: '军人保障号',
    key: 'junrenbzh',
  }, {
    label: '保障卡号',
    key: 'baozhangkh',
  }],
  [{
    label: '卡类型',
    key: 'kaleixing',
  }, {
    label: '是否已制卡',
    key: 'shifouyzk',
    options: 'ENUM',
  }],
  [{
    label: '医疗卡号',
    key: 'yiliaokh',
  }, {
    label: '医疗账号',
    key: 'yiliaozh',
  }],
  [{
    label: '士官注册码',
    key: 'shibingzcm',
  }, {
    label: '士兵服装登记码',
    key: 'shibingfzdjbhm',
  }],
  [{
    label: '民族',
    key: 'minzu'
  }, {
    label: '籍贯',
    key: 'jiguan'
  }],
  [{
    label: '出生地',
    key: 'chushengdi'
  }, {
    label: '出生日期',
    key: 'chushengrq'
  }],
  [{
    label: '血型',
    key: 'xuexing'
  },
  {
    label: '工作日期',
    key: 'gongzuorq'
  }
  ],
  [{
    label: '离退休日期',
    key: 'lituixrq'
  }, {
    label: '工作单位代码',
    key: 'gongzuodwdm'
  }],
  [{
    label: '工作单位名称',
    key: 'gongzuodwmc'
  }, {
    label: '部别',
    key: 'bubie'
  }],
  [{
    label: '部门ID',
    key: 'bumenid'
  }, {
    label: '主类别',
    key: 'zhuleibie',
    options: 'ZHULEIBIE'
  }],
  [{
    label: '军种',
    key: 'junzhong',
    options: 'JUNZHONG'
  }, {
    label: '入伍时间',
    key: 'ruwurq',
    attrs: {
      readonly: true
    }
  }],
  [{
    label: '证件类型',
    key: 'zhengjianlx',
    attrs: {
      readonly: true
    }
  }, {
    label: '证件编号',
    key: 'zhengjianbh',
    attrs: {
      readonly: true
    }
  }],
  [{
    label: '人员类别',
    key: 'renyuanlb',
    options: 'RENYUANLB'
  }, /* {
    label: '有否照片',
    key: 'youfouzp',
    options: 'ENUM'
  } */],
  [{
    label: '职工身份类别',
    key: 'zhigongsflb',
    options: 'ZHIGONGSFLB'
  }, {
    label: '家属身份类别',
    key: 'jiashusflb',
    options: 'JIASHUSFLB'
  }],
  [{
    label: '文化程度',
    key: 'wenhuacd',
    options: 'WENHUACD'
  }, {
    label: '毕业院校',
    key: 'biyeyx'
  }],
  [{
    label: '入学日期',
    key: 'ruxuerq'
  }, {
    label: '毕业日期',
    key: 'biyerq'
  }],
  [{
    label: '毕业专业',
    key: 'biyezy'
  }, {
    label: '学位',
    key: 'xuewei'
  }],
  [{
    label: '政治面貌',
    key: 'zhengzhimm',
    options: 'ZHENGZHIMM'
  }, {
    label: '选改士官日期',
    key: 'gaixuansgrq'
  }],
  [{
    label: '军衔文职级',
    key: 'junxianwzj'
  }, {
    label: '现军衔文职级日期',
    key: 'xianjunxwzjrq'
  }],
  [{
    label: '行政职务',
    key: 'xingzhengzw'
  }, {
    label: '现行政职务日期',
    key: 'xianxingzzwrq'
  }],
  [{
    label: '行政职务等级',
    key: 'xingzhengzwdj'
  }, {
    label: '现行行政职务等级日期',
    key: 'xianxingzzwdjrq'
  }],
  [{
    label: '专业技术职务',
    key: 'zhuanyejszw'
  }, {
    label: '专业技术职务日期',
    key: 'zhuanyejszwrq'
  }],
  [{
    label: '专业技术等级',
    key: 'zhuanyejsdj'
  }, {
    label: '专业技术等级日期',
    key: 'zhuanyejsdjrq'
  }],
  [{
    label: '后勤干部专业类别',
    key: 'houqingbzylb',
    // options: ''
  }, {
    label: '机关分队标识',
    key: 'jiguanfdbs'
  }],
  [{
    label: '是否军人家属',
    key: 'shifoujrjs',
    options: 'ENUM'
  }, {
    label: '家属工作单位',
    key: 'jiashugzdw'
  }],
  [{
    label: '婚姻状况',
    key: 'hunyinzk'
  }, {
    label: '配偶姓名',
    key: 'peiouxm'
  }],
  [{
    label: '配偶工作单位',
    key: 'peiougzdw'
  }, {
    label: '是否遗属',
    key: 'shifouys',
    options: 'ENUM'
  }],
  [{
    label: '对应职工/军人ID',
    key: 'duiyingjrzgid'
  }, {
    label: '对应军人姓名',
    key: 'duiyingjrxm'
  }],
  [{
    label: '对应军人保障号',
    key: 'duiyingjrbzh'
  }, {
    label: '对应军人证件编号',
    key: 'duiyingjrzjbh'
  }],
  [{
    label: '是否符合远离军队医疗机构条件',
    key: 'shifoufhyljdyljgtj',
    options: 'ENUM'
  }, {
    label: '基层医疗机构ID',
    key: 'jicengyljgid'
  }],
  [{
    label: '基层医疗机构名称',
    key: 'jicengyljgmc'
  }, {
    label: '经济状况',
    key: 'jingjizk'
  }],
  [{
    label: '联系电话',
    key: 'lianxidh'
  }, {
    label: '个人状态',
    key: 'gerenzt'
  }],
  [{
    label: '一类特供人员类别',
    key: 'yileitgrylb',
    options: 'YILEITGRYLB'
  }, {
    label: '二类特供人员类别',
    key: 'erleitgrylb',
    options: 'ERLEITGRYLB'
  }],
  [{
    label: '三类特供人员类别',
    key: 'sanleitgrylb',
    options: 'SANLEITGRYLB'
  }, {
    label: '四类特供人员类别',
    key: 'sileitgrylb',
    options: 'SILEITGRYLB'
  }],
  [{
    label: '五类特供人员类别',
    key: 'wuleitgrylb',
    options: 'WULEITGRYLB'
  }, {
    label: '采集上报日期',
    key: 'shangbaobz'
  }],
  [{
    label: '备注',
    key: 'beizhu',
    attrs: {}
  }],
  [{
    label: '下发标志',
    key: 'xiafabz',
    // options: ''
  }, {
    label: '人员基本信息采集依据',
    key: 'renyuanjbxxcjyj'
  }],
  [{
    label: '顺序码',
    key: 'shunxum'
  }, {
    label: '职工登记号码',
    key: 'zhigongdjhm'
  }],
  [{
    label: '原军人ID',
    key: 'yuanid'
  }, {
    label: '银行代码',
    key: 'yinhangdm'
  }],
  [{
    label: '银行所在地',
    key: 'yinhangszd'
  }, {
    label: '银行卡号',
    key: 'yinhangkh'
  }],
  [{
    label: '岗位等级',
    key: 'gangweidj'
  }, {
    label: '岗位情况',
    key: 'gangweiqk'
  }],
  [{
    label: '参加医疗保险情况',
    key: 'canjiaylbxqk'
  }],
  [{
    label: '行政关系所在单位名称',
    key: 'xzgxdwmc'
  }, {
    label: '行政关系所在单位代码',
    key: 'xzgxddxh'
  }],
  [{
    label: '财务关系所在单位名称',
    key: 'cwgxdwmc'
  }, {
    label: '财务关系所在单位代码',
    key: 'cwgxdwdm'
  }],
  [{
    label: '医疗关系所在单位代码',
    key: 'ylgxdwdm'
  }, {
    label: '医疗关系所在单位名称',
    key: 'ylgxdwmc'
  }],
  [{
    label: '被装关系所在单位名称',
    key: 'bzgxdwmc'
  }, {
    label: '被装关系所在单位代码',
    key: 'bzgxdwdm'
  }],
  [{
    label: '营房关系所在单位代码',
    key: 'yfgxdwdm'
  }, {
    label: '营房关系所在单位名称',
    key: 'yfgxdwmc'
  }],
  [{
    label: '所在气候区',
    key: 'suozaiqhq'
  }],
  [{
    label: '是否在校学员',
    key: 'shifouzxxy',
    options: 'ENUM'

  }, {
    label: '工勤技能等级日期',
    key: 'gongqinjndjrq'
  }],
  [{
    label: '在职情况',
    key: 'zaizhiqk',
    // options: ''
  }, {
    label: '审核人',
    key: 'shenheren'
  }],
  [{
    label: '行政命令号',
    key: 'xingzhengmlh'
  }, {
    label: '批准人',
    key: 'pizhunren'
  }],
  [{
    label: '批准人日期',
    key: 'pizhunrq'
  }, /* {
    label: '照片是否修改',
    key: 'zhaopiansfxg',
    options: 'ENUM'
  } */],
  [{
    label: '部门审核状态',
    key: 'bumenshzt',
    // options: ''
  }, {
    label: '工资列支渠道',
    key: 'gongzilzqd'
  }],
  [{
    label: '采集上报单位',
    key: 'caijisbdw'
  }, {
    label: '是否享有随军配偶保险',
    key: 'shifouxysjpobx',
    options: 'ENUM'
  }]
]
