import service from '@/utils/request'

// @Tags DeviceInfo
// @Summary 用id查询DeviceInfo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceInfo true "用id查询DeviceInfo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /deviceInfo/findDeviceInfo [get]
export const findDeviceInfo = (params) => {
  return service({
    url: '/things/device/findDeviceInfo',
    method: 'get',
    params
  })
}

export const getDeviceData = (params) => {
  return service({
    url: '/things/device/getDeviceData',
    method: 'get',
    params
  })
}

export const getDeviceDescribeLog = (params) => {
  return service({
    url: '/things/device/getDeviceDescribeLog',
    method: 'get',
    params
  })
}

// @Tags DeviceInfo
// @Summary 分页获取DeviceInfo列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取DeviceInfo列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceInfo/getDeviceInfoList [get]
export const getDeviceInfoList = (params) => {
  return service({
    url: '/things/device/getDeviceInfoList',
    method: 'get',
    params
  })
}

export const manageDeviceInfo = (data) => {
  return service({
    url: '/things/device/manageDeviceInfo',
    method: 'post',
    data
  })
}
