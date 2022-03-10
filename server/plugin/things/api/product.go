package api

import (
	"encoding/json"
	"fmt"
	"github.com/flipped-aurora/gin-vue-admin/server/global"
	"github.com/flipped-aurora/gin-vue-admin/server/model/common/response"
	"github.com/flipped-aurora/gin-vue-admin/server/plugin/things/model"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type ProductApi struct {
}

func (p *ProductApi) ManageProductInfo(c *gin.Context) {
	var productInfo model.ManageReq
	_ = c.ShouldBindJSON(&productInfo)
	ret, err := Post(fmt.Sprintf("%s/open/dm/manageProduct", global.GVA_CONFIG.Webapi.Addr),
		productInfo, "application/json")
	global.GVA_LOG.Error(fmt.Sprintf("req:%+v|resp=%+v", productInfo, ret))
	if err != nil {
		global.GVA_LOG.Error("管理产品信息失败!", zap.Any("err", err))
		response.Result(int(err.Code), nil, err.Msg, c)
	} else {
		response.OkWithMessage("管理产品信息成功", c)
	}
}

// FindProductInfo 用id查询ProductInfo
// @Tags ProductInfo
// @Summary 用id查询ProductInfo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ProductInfo true "用id查询ProductInfo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /productInfo/findProductInfo [get]
func (p *ProductApi) FindProductInfo(c *gin.Context) {
	var productInfo model.GetProductInfoReq
	_ = c.ShouldBindQuery(&productInfo)
	ret, err := Post(fmt.Sprintf("%s/open/dm/getProductInfo", global.GVA_CONFIG.Webapi.Addr),
		model.GetProductInfoReq{ProductID: productInfo.ProductID}, "application/json")
	global.GVA_LOG.Error(ret)
	if err != nil {
		global.GVA_LOG.Error("获取失败!", zap.Any("err", err))
		response.Result(int(err.Code), nil, err.Msg, c)
	} else {
		retJson := map[string]interface{}{}
		json.Unmarshal([]byte(ret), &retJson)
		response.OkWithData(gin.H{"productInfo": retJson["list"].([]interface{})[0]}, c)
	}
}

func (p *ProductApi) GetProductInfoList(c *gin.Context) {
	var pageInfo model.ProductInfoSearch
	_ = c.ShouldBindQuery(&pageInfo)
	ret, err := Post(fmt.Sprintf("%s/open/dm/getProductInfo", global.GVA_CONFIG.Webapi.Addr),
		model.GetProductInfoReq{Page: &pageInfo.PageInfo}, "application/json")
	global.GVA_LOG.Info(ret)

	if err != nil {
		global.GVA_LOG.Error("获取失败!", zap.Any("err", err))
		response.Result(int(err.Code), nil, err.Msg, c)
	} else {
		resp := model.ThingsResp{}
		json.Unmarshal([]byte(ret), &resp)
		response.OkWithDetailed(response.PageResult{
			List:     resp.List,
			Total:    resp.Total,
			Page:     pageInfo.Page,
			PageSize: len(resp.List),
		}, "获取成功", c)
	}
}

func (p *ProductApi) ManageProductTemplate(c *gin.Context) {
	var req model.ManageProductTemplateReq
	//req := map[string]interface{}{}
	_ = c.ShouldBindJSON(&req)
	ret, err := Post(fmt.Sprintf("%s/open/dm/manageProductTemplate", global.GVA_CONFIG.Webapi.Addr),
		req, "application/json")
	global.GVA_LOG.Error(fmt.Sprintf("req:%+v|resp=%+v", req, ret))
	if err != nil {
		global.GVA_LOG.Error("更新产品模板信息失败!", zap.Any("err", err))
		response.Result(int(err.Code), nil, err.Msg, c)
	} else {
		response.OkWithMessage("更新产品模板信息成功", c)
	}
}

func (p *ProductApi) GetProductTemplate(c *gin.Context) {
	var req model.GetProductTemplateReq
	_ = c.ShouldBindQuery(&req)
	ret, err := Post(fmt.Sprintf("%s/open/dm/getProductTemplate", global.GVA_CONFIG.Webapi.Addr),
		req, "application/json")
	global.GVA_LOG.Info(ret)
	if err != nil {
		global.GVA_LOG.Error("获取失败!", zap.Any("err", err))
		response.Result(int(err.Code), nil, err.Msg, c)
	} else {
		resp := model.ProductTemplate{}
		json.Unmarshal([]byte(ret), &resp)
		response.OkWithDetailed(resp, "获取成功", c)
	}
}
