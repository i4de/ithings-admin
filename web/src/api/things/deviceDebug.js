import service from '@/utils/request'

export const DeviceDebugPush = (data) => {
  return service({
    url: '/things/device/DeviceDebug',
    method: 'post',
    data
  })
}
