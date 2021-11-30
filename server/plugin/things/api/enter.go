package api

type ApiGroup struct {
	ProductApi
	DeviceApi
	UserApi
}

var ApiGroupApp = new(ApiGroup)
