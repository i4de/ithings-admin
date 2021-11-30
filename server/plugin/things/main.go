package things

import (
	"github.com/flipped-aurora/gin-vue-admin/server/plugin/things/global"
	"github.com/flipped-aurora/gin-vue-admin/server/plugin/things/router"
	"github.com/gin-gonic/gin"
)

type thingsPlugin struct {

}

func CreateThingsPlugin(webapiAddr string) *thingsPlugin {
	global.GlobalConfig.Addr = webapiAddr
	return &thingsPlugin{}
}

func (*thingsPlugin) Register(group *gin.RouterGroup) {
	deviceGroup := group.Group("device")
	router.RouterGroupApp.InitDeviceRouter(deviceGroup)
}

func (*thingsPlugin) RouterPath() string {
	return "things"
}
