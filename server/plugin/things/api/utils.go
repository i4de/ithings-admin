package api

import (
	"bytes"
	"encoding/json"
	"gitee.com/godLei6/things/shared/errors"
	"io/ioutil"
	"net/http"
	"time"
)

// 发送POST请求
// url：         请求地址
// data：        POST请求提交的数据
// contentType： 请求体格式，如：application/json
// content：     请求放回的内容
func Post(url string, data interface{}, contentType string) (string ,*errors.CodeError){

	// 超时时间：5秒
	client := &http.Client{Timeout: 5 * time.Second}
	jsonStr, _ := json.Marshal(data)
	resp, err := client.Post(url, contentType, bytes.NewBuffer(jsonStr))
	if err != nil {
		return "",errors.System.AddDetail(err)
	}
	defer resp.Body.Close()

	result, _ := ioutil.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		getErr := errors.System.AddDetail(result)
		json.Unmarshal([]byte(result),&getErr)
		return "", getErr
	}
	return string(result),nil
}