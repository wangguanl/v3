function deepCopy(obj) {
  // 判断是否是简单数据类型，
  let result;
  if (typeof obj === 'object') {
    // 复杂数据类型
    result = Array.isArray(obj) ? [] : {}
    for (const i in obj) {
      result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
    }
  } else {
    // 简单数据类型 直接 == 赋值
    result = obj
  }
  return result
}

export default deepCopy
