/* function GetAuthMode(mode) {
  switch (mode) {
    case 0:
      return '账密认证'
    case 1:
      return '秘钥认证'
  }
}*/
export const INSERT = 0
export const UPDATE = 1
export const DELETE = 2
export const AuthMode = ['未定义', '账密认证', '秘钥认证']

/* function GetDeviceType(type) {
  switch (type) {
    case 0:
      return '设备'
    case 1:
      return '网关'
    case 2:
      return '子设备'
  }
}*/
export const DeviceType = ['未定义', '设备', '网关', '子设备']
/* function GetNetType(type) {
  switch (type) {
    case 0:
      return '其他'
    case 1:
      return 'WiFi'
    case 2:
      return '2G/3G/4G'
    case 3:
      return '5G'
    case 4:
      return 'BLE'
    case 5:
      return 'LoRaWAN'
  }
}*/
export const NetType = ['未定义', '其他', 'WiFi', '2G/3G/4G', '5G', 'BLE', 'LoRaWAN']

/* function GetDataProto(type) {
  switch (type) {
    case 0:
      return '自定义'
    case 1:
      return '数据模板'
  }
}*/
export const DataProto = ['未定义', '自定义', '数据模板']

/* function GetAutoRegister(type) {
  switch (type) {
    case 0:
      return '关闭'
    case 1:
      return '打开'
    case 2:
      return '打开并自动创建设备'
  }
}*/

export const AutoRegister = ['未定义', '关闭', '打开', '打开并自动创建设备']
export const LogLevel = ['关闭', '关闭', '错误', '告警', '信息', '调试']

export default {
  AutoRegister,
  DataProto,
  NetType,
  DeviceType,
  AuthMode,
  LogLevel
}
