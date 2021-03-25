export default [{
  label: '姓名',
  key: 'name',
  attr: {
    width: 160,
  },
}, {
  label: 'qq',
  key: 'qq',
  attr: {
    width: 160,
  }
}, {
  label: '性别',
  key: 'genderName',
  attr: {
    width: 60,
  }
}, {
  label: '内容',
  key: 'content',
  attr: {
    minWidth: 200,
    align: 'left'
  }
}, {
  label: '创建时间',
  key: 'createTime',
  attr: {
    width: 200
  }
}].map(item => {
  item.attr.align = item.attr.align || 'center';
  return item;
})