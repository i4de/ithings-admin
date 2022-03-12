import { fmtDate } from '../../../js/utils'

export function fmtPropertyTemplateData(temp, deviceData) {
  console.log('fmtPropertyTemplateData', temp, deviceData)
  const dev = fmtDeviceData(deviceData)
  const ret = []
  for (let i = 0; i < temp.properties.length; i++) {
    const property = temp.properties[i]
    if (dev[property.id] !== undefined) {
      // 如果有数据
      ret.push({
        dataID: property.id,
        dataName: property.name,
        dataType: property.define.type,
        timestamp: fmtDate(dev[property.id].timestamp / 1000),
        getValue: dev[property.id].getValue,
      })
    } else {
      ret.push({
        dataID: property.id,
        dataName: property.name,
        dataType: property.define.type,
        timestamp: '',
        getValue: '',
      })
    }
  }
  return ret
}

function fmtDeviceData(deviceData) {
  const ret = {}
  for (let i = 0; i < deviceData.length; i++) {
    ret[deviceData[i].dataID] = deviceData[i]
  }
  console.log('fmtDeviceData', ret)
  return ret
}
