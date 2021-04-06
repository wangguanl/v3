export default [
  {
    label: '姓名',
    key: 'name',
    attrs: {
      width: 160,
    },
  }, {
    label: 'qq',
    key: 'qq',
    attrs: {
      width: 160,
    }
  }, {
    label: '性别',
    key: 'genderName',
    attrs: {
      width: 60,
    }
  }, {
    label: '内容',
    key: 'content',
    attrs: {
      minWidth: 200,
      align: 'left'
    }
  }, {
    label: '创建时间',
    key: 'createTime',
    attrs: {
      width: 200
    }
  }
].map(item => {
  item.attrs.align = item.attrs.align || 'center';
  return item;
})