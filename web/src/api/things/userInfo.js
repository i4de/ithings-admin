import service from '@/utils/request'

// @Tags ProductInfo
// @Summary 用id查询ProductInfo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ProductInfo true "用id查询ProductInfo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /productInfo/findProductInfo [get]
export const getUserCoreList = (params) => {
  return service({
    url: '/things/device/getUserCoreList',
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
export const getUserInfos = (data) => {
  return service({
    url: '/things/device/getUserInfos',
    method: 'post',
    data
  })
}

