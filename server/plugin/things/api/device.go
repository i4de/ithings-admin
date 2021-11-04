package api

import (
	"encoding/json"
	"fmt"
	"github.com/flipped-aurora/gin-vue-admin/server/global"
	"github.com/flipped-aurora/gin-vue-admin/server/model/common/request"
	"github.com/flipped-aurora/gin-vue-admin/server/model/common/response"
	"github.com/flipped-aurora/gin-vue-admin/server/plugin/things/model"
	"github.com/gin-gonic/gin"
	"github.com/spf13/cast"
	"go.uber.org/zap"
)

type DeviceApi struct {
}


type GetDeviceInfoReq struct {
	DeviceName string    `protobuf:"bytes,1,opt,name=deviceName,proto3" form:"deviceName" json:"deviceName,optional"` //设备名 为空时获取产品id下的所有设备信息
	ProductID  string    `protobuf:"bytes,2,opt,name=productID,proto3" form:"productID" json:"productID,omitempty"`   //产品id
	Page      *request.PageInfo `protobuf:"bytes,2,opt,name=page,proto3" form:"page" json:"page,optional"`           //分页信息,只获取一个则不填
}


// FindDeviceInfo 用id查询DeviceInfo
// @Tags DeviceInfo
// @Summary 用id查询DeviceInfo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceInfo true "用id查询DeviceInfo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /deviceInfo/findDeviceInfo [get]
func (d *DeviceApi)FindDeviceInfo(c *gin.Context) {
	var deviceInfoReq GetDeviceInfoReq
	_ = c.ShouldBindQuery(&deviceInfoReq)
	ret,err := Post(fmt.Sprintf("%s/dm/getDeviceInfo", global.GVA_CONFIG.Webapi.Addr),
		deviceInfoReq,"application/json")
	global.GVA_LOG.Error(ret)
	if err != nil {
		global.GVA_LOG.Error("获取失败!", zap.Any("err", err))
		response.Result(int(err.Code),nil,err.Msg, c)
	} else {
		retJson := map[string]interface{}{}
		json.Unmarshal([]byte(ret),&retJson)
		response.OkWithData(gin.H{"deviceInfo": retJson["info"].([]interface{})[0]}, c)
	}
}


// GetDeviceInfoList 分页获取DeviceInfo列表
// @Tags DeviceInfo
// @Summary 分页获取DeviceInfo列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.DeviceInfoSearch true "分页获取DeviceInfo列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceInfo/getDeviceInfoList [get]
func (d *DeviceApi)GetDeviceInfoList(c *gin.Context) {
	var pageInfo model.DeviceInfoSearch
	_ = c.ShouldBindQuery(&pageInfo)
	global.GVA_LOG.Error(fmt.Sprintf("pageInfo:%+v",pageInfo))
	ret,err := Post(fmt.Sprintf("%s/dm/getDeviceInfo", global.GVA_CONFIG.Webapi.Addr),
		model.GetProductInfoReq{Page: &pageInfo.PageInfo,ProductID: pageInfo.ProductID},"application/json")
	global.GVA_LOG.Error(ret)

	if err != nil {
		global.GVA_LOG.Error("获取失败!", zap.Any("err", err))
		response.Result(int(err.Code),nil,err.Msg, c)
	} else {
		retJson := map[string]interface{}{}
		json.Unmarshal([]byte(ret),&retJson)
		response.OkWithDetailed(response.PageResult{
			List:     retJson["info"],
			Total:    cast.ToInt64(retJson["total"]),
			Page:     pageInfo.Page,
			PageSize: pageInfo.PageSize,
		}, "获取成功", c)
	}
}


func (d *DeviceApi)ManageDeviceInfo(c *gin.Context){
	var deviceInfo model.ManageReq
	_ = c.ShouldBindJSON(&deviceInfo)
	ret,err := Post(fmt.Sprintf("%s/dm/manageDevice", global.GVA_CONFIG.Webapi.Addr),
		deviceInfo,"application/json")
	global.GVA_LOG.Error(fmt.Sprintf("req:%+v|resp=%+v",deviceInfo,ret))
	if err != nil {
		global.GVA_LOG.Error("管理设备信息失败!", zap.Any("err", err))
		response.Result(int(err.Code),nil,err.Msg, c)
	} else {
		response.OkWithMessage("管理设备信息成功", c)
	}
}