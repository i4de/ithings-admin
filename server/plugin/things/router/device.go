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
	var GetProductTemp = api.ApiGroupApp.ProductApi.GetProductTemplate
	var ManageProductTemplate = api.ApiGroupApp.ProductApi.ManageProductTemplate
	var FindDeviceInfo = api.ApiGroupApp.DeviceApi.FindDeviceInfo
	var GetDeviceInfoList = api.ApiGroupApp.DeviceApi.GetDeviceInfoList
	var ManageDeviceInfo = api.ApiGroupApp.DeviceApi.ManageDeviceInfo
	var GetUserCoreList = api.ApiGroupApp.UserApi.GetUserCoreList
	var GetUserInfos = api.ApiGroupApp.UserApi.GetUserInfos
	var GetDeviceData = api.ApiGroupApp.DeviceApi.GetDeviceData
	var GetDeviceDescribeLog = api.ApiGroupApp.DeviceApi.GetDeviceDescribeLog
	{
		DeviceRouter.POST("manageProductInfo", ManageProductInfo)  // 管理ProductInfo
		DeviceRouter.GET("findProductInfo", FindProductInfo)       // 根据ID获取ProductInfo
		DeviceRouter.GET("getProductInfoList", GetProductInfoList) // 获取ProductInfo列表

		DeviceRouter.GET("getProductTemplate", GetProductTemp)            // 根据ID获取产品物模型信息
		DeviceRouter.POST("manageProductTemplate", ManageProductTemplate) // 更新产品物模型

		DeviceRouter.GET("findDeviceInfo", FindDeviceInfo)       // 根据ID获取DeviceInfo
		DeviceRouter.GET("getDeviceInfoList", GetDeviceInfoList) // 获取DeviceInfo列表
		DeviceRouter.POST("manageDeviceInfo", ManageDeviceInfo)  // 管理设备信息

		DeviceRouter.GET("getUserCoreList", GetUserCoreList) // 管理设备信息
		DeviceRouter.POST("getUserInfos", GetUserInfos)      // 管理设备信息

		DeviceRouter.GET("getDeviceData", GetDeviceData) // 获取设备数据
		DeviceRouter.GET("getDeviceDescribeLog", GetDeviceDescribeLog) // 获取设备日志
	}
}
