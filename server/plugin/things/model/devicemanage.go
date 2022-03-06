package model

import "github.com/flipped-aurora/gin-vue-admin/server/model/common/request"

type ManageReq struct {
	Opt  int         `json:"opt" form:"opt"`   // //操作 0:新增 1:修改 2:删除
	Info interface{} `json:"info" form:"info"` // 操作的内容
}

type GetProductInfoReq struct {
	ProductID string            `protobuf:"bytes,1,opt,name=productID,proto3" form:"productID" json:"productID,optional"` //产品id  如果为空返回所有产品的信息
	Page      *request.PageInfo `protobuf:"bytes,2,opt,name=page,proto3" form:"page" json:"page,optional"`                //分页信息,只获取一个则不填
}
type ProductInfoSearch struct {
	request.PageInfo
}

type DeviceInfoSearch struct {
	ProductID  string `json:"productID" form:"productID"` //产品id 只读
	DeviceName string `json:"deviceName" form:"deviceName"`
	request.PageInfo
}

type ThingsResp struct {
	List  []interface{} `json:"list,omitempty"`           //
	Total int64         `json:"total,optional,omitempty"` //拥有的总数(只有分页的时候会返回)
	Num   int64         `json:"num,optional,omitempty"`   //返回的数量
}

type ProductInfo struct {
	CreatedTime  int64   `json:"createdTime,optional,string,omitempty"` //创建时间 只读
	ProductID    string  `json:"productID,optional,omitempty"`          //产品id 只读
	ProductName  string  `json:"productName,optional,omitempty"`        //产品名称
	AuthMode     int64   `json:"authMode,optional"`                     //认证方式:1:账密认证,2:秘钥认证
	DeviceType   int64   `json:"deviceType,optional"`                   //设备类型:1:设备,2:网关,3:子设备
	CategoryID   int64   `json:"categoryID,optional"`                   //产品品类
	NetType      int64   `json:"netType,optional"`                      //通讯方式:1:其他,2:wi-fi,3:2G/3G/4G,4:5G,5:BLE,6:LoRaWAN
	DataProto    int64   `json:"dataProto,optional"`                    //数据协议:1:自定义,2:数据模板
	AutoRegister int64   `json:"autoRegister,optional"`                 //动态注册:1:关闭,2:打开,3:打开并自动创建设备
	Secret       string  `json:"secret,optional,omitempty"`             //动态注册产品秘钥 只读
	Description  *string `json:"description,optional,omitempty"`        //描述
	DevStatus    *string `json:"devStatus,optional,omitempty"`          // 产品状态
}

type ManageProductTemplateReq struct {
	Info *ProductTemplate `json:"info,optional,omitempty"` //产品信息
}

type GetProductTemplateReq struct {
	ProductID string `json:"productID" form:"productID"` //产品id
}

type GetProductTemplateResp struct {
	Info ProductTemplate `json:"info,omitempty"` //产品信息
}

type ProductTemplate struct {
	CreatedTime int64   `json:"createdTime,optional,string,omitempty"` //创建时间 只读
	ProductID   string  `json:"productID,optional,omitempty"`          //产品id 只读
	Template    *string `json:"template,optional,omitempty"`           //数据模板
}


type GetDeviceDataReq struct {
	Method     string `form:"method,omitempty"`                    //获取的类型   property 属性 event事件  log 所有日志
	DeviceName string `form:"deviceName,omitempty"`                //设备名
	ProductID  string `form:"productID,omitempty"`                 //产品id 获取产品id下的所有设备信息
	DataID     string `form:"dataID,omitempty"`                    //获取的具体标识符的数据
	TimeStart  int64  `form:"timeStart,string,optional,omitempty"` //获取时间的开始
	TimeEnd    int64  `form:"timeEnd,string,optional,omitempty"`   //时间的结束
	Limit      int64  `form:"limit,optional,omitempty"`            //获取的长度
}

type DeviceData struct {
	Timestamp int64  `json:"timestamp,string"` //发生时间戳
	Method    string `json:"method"`           //操作类型
	DataID    string `json:"dataID"`           //获取的具体属性值
	Payload   string `json:"payload"`          //具体内容
}

type GetDeviceDataResp struct {
	Total int64         `json:"total,string"` //总数
	Data  []*DeviceData `json:"data"`         //总数
}

type GetDeviceDescribeLogReq struct {
	ProductID  string `form:"productID,omitempty"`
	DeviceName string `form:"deviceName,omitempty"`
	TimeStart  int64  `form:"timeStart,optional,string,omitempty"`
	TimeEnd    int64  `form:"timeEnd,optional,string,omitempty"`
	Limit      int64  `form:"limit,optional,omitempty"`
}

type GetDeviceDescribeLogResp struct {
	Data []*DeviceDescribeLog `json:"data,omitempty"`
}

type DeviceDescribeLog struct {
	Timestamp  int64  `json:"timestamp,string"`
	Action     string `json:"action"`
	RequestID  string `json:"requestID"`
	TranceID   string `json:"tranceID"`
	Topic      string `json:"topic"`
	Content    string `json:"content"`
	ResultType int64  `json:"resultType,string"`
}
