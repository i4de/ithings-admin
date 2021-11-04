package api

type ApiGroup struct {
	ProductApi
	DeviceApi
}

var ApiGroupApp = new(ApiGroup)
