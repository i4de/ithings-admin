package router

import (
	"github.com/flipped-aurora/gin-vue-admin/server/middleware"
	"github.com/flipped-aurora/gin-vue-admin/server/plugin/things/api"
	"github.com/gin-gonic/gin"
)

type DeviceRouter struct {
}

func (s *DeviceRouter) InitDeviceRouter(Router *gin.RouterGroup) {
	DeviceRouter := Router.Use(middleware.OperationRecord())
	var ManageProductInfo = api.ApiGroupApp.ProductApi.ManageProductInfo
	var FindProductInfo = api.ApiGroupApp.ProductApi.FindProductInfo
	var GetProductInfoList = api.ApiGroupApp.ProductApi.GetProductInfoList
	var FindDeviceInfo = api.ApiGroupApp.DeviceApi.FindDeviceInfo
	var GetDeviceInfoList = api.ApiGroupApp.DeviceApi.GetDeviceInfoList
	var ManageDeviceInfo = api.ApiGroupApp.DeviceApi.ManageDeviceInfo
	{
		DeviceRouter.POST("manageProductInfo", ManageProductInfo)   // 管理ProductInfo
		DeviceRouter.GET("findProductInfo", FindProductInfo)        // 根据ID获取ProductInfo
		DeviceRouter.GET("getProductInfoList", GetProductInfoList)  // 获取ProductInfo列表

		DeviceRouter.GET("findDeviceInfo", FindDeviceInfo)        // 根据ID获取DeviceInfo
		DeviceRouter.GET("getDeviceInfoList", GetDeviceInfoList)  // 获取DeviceInfo列表
		DeviceRouter.POST("manageDeviceInfo", ManageDeviceInfo)   // 管理设备信息
	}
}
