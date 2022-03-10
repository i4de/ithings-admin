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

type UserApi struct {
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
func (d *UserApi) GetUserCoreList(c *gin.Context) {
	var pageInfo request.PageInfo
	_ = c.ShouldBindQuery(&pageInfo)
	global.GVA_LOG.Error(fmt.Sprintf("pageInfo:%+v", pageInfo))
	ret, err := Get(fmt.Sprintf("%s/open/user/userCoreList?page=%d&pageSize=%d",
		global.GVA_CONFIG.Webapi.Addr, pageInfo.Page, pageInfo.PageSize))
	global.GVA_LOG.Error(ret)

	if err != nil {
		global.GVA_LOG.Error("获取失败!", zap.Any("err", err))
		response.Result(int(err.Code), nil, err.Msg, c)
	} else {
		retJson := map[string]interface{}{}
		json.Unmarshal([]byte(ret), &retJson)
		response.OkWithDetailed(response.PageResult{
			List:     retJson["info"],
			Total:    cast.ToInt64(retJson["total"]),
			Page:     pageInfo.Page,
			PageSize: pageInfo.PageSize,
		}, "获取成功", c)
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
func (d *UserApi) GetUserInfos(c *gin.Context) {
	var pageInfo model.GetUserInfosReq
	_ = c.ShouldBindJSON(&pageInfo)
	global.GVA_LOG.Error(fmt.Sprintf("pageInfo:%+v", pageInfo))
	ret, err := Post(fmt.Sprintf("%s/open/user/userInfos", global.GVA_CONFIG.Webapi.Addr),
		pageInfo, "application/json")
	global.GVA_LOG.Error(ret)

	if err != nil {
		global.GVA_LOG.Error("获取失败!", zap.Any("err", err))
		response.Result(int(err.Code), nil, err.Msg, c)
	} else {
		retJson := map[string]interface{}{}
		json.Unmarshal([]byte(ret), &retJson)
		response.OkWithDetailed(response.PageResult{
			List: retJson["info"],
		}, "获取成功", c)
	}
}