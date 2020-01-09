const timestampToTime = function (val, column) {
  if (!val) return
  var date = new Date(val)
  var Y = date.getFullYear() + '-'
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var D =
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':'
  var s =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}
const handleType = function (val, type) {
  let dataObj = {
    taskStatus: {
      '0': '失败',
      '1': '成功'
    },
    devOnlineStatus: {
      '0': '离线',
      '1': '在线'
    }
  }
  if (dataObj[type]) {
    return dataObj[type][val]
  }
}

export {
  timestampToTime,
  handleType
}
