import service from '@/utils/request'

export const manageProductInfo = (data) => {
  return service({
    url: '/things/device/manageProductInfo',
    method: 'post',
    data
  })
}

// @Tags ProductInfo
// @Summary 用id查询ProductInfo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ProductInfo true "用id查询ProductInfo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /productInfo/findProductInfo [get]
export const findProductInfo = (params) => {
  return service({
    url: '/things/device/findProductInfo',
    method: 'get',
    params
  })
}

// @Tags ProductInfo
// @Summary 分页获取ProductInfo列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取ProductInfo列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /productInfo/getProductInfoList [get]
export const getProductInfoList = (params) => {
  return service({
    url: '/things/device/getProductInfoList',
    method: 'get',
    params
  })
}
