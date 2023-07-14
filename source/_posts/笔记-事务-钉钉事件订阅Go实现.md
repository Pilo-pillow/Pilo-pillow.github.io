---
title: 笔记.事务.钉钉事件订阅Go实现
author: Pillow
tags:
  - 事务
  - 钉钉
categories:
  - 笔记
abbrlink: 2172817962
date: 2023-04-17 19:26:00
---
# 笔记.事务.钉钉事件订阅Go

钉钉平台开放事件订阅的功能，也就是钉钉平台会推送你所订阅的事件，像是部门变更、人员签到、群会话变动。

在钉钉开放平台中——我的后台——应用开发中，选择你的钉钉应用，在其中的事件与回调中使用事件订阅功能。

![image-20230417090336250](https://pillow-blog-pictures.oss-cn-shanghai.aliyuncs.com/image-20230417090336250.png)

`加密aes_key`和`签名token`可以随机生成也可以自己配置，填写`请求网址`(公网IP)后点击保存

钉钉平台会将`加密aes_key`和`签名token`加密成一个名为`encrypt`的字段包含在一个`application/json`文件中POST向你的请求网址并且会携带`signature`、`timestamp`、`nonce`三个参数

~~~json
{
    "encrypt": "ajls384kdjx98XX" // 加密字符串
}
~~~

~~~http
http://你注册的HTTP地址?signature=111108bb8e6dbc2xxxx&timestamp=1783610513&nonce=380320111
~~~

> 说明
>
> signature：签名
>
> timestamp：时间戳
>
> nonce：随机数
>
> encrypt：密文

解密方法在此不详细说，钉钉平台给出了完整流程的demo——[dingtalk-callback-Crypto]([GitHub - open-dingtalk/dingtalk-callback-Crypto: 钉钉回调加解密类库和对应demo](https://github.com/open-dingtalk/dingtalk-callback-Crypto?spm=ding_open_doc.document.0.0.58e527b7rXUem2))

在Go-Demo中，具体使用流程如下

接受到如上四个参数后，首先使用我们配置的`加密aes_key`和`签名token`以及`appkey`（即小程序或应用的唯一标识）应用类型不同不一定是appkey

![image-20230417094200408](https://pillow-blog-pictures.oss-cn-shanghai.aliyuncs.com/image-20230417094200408.png)

所有准备好后开始解密，具体代码如下:

~~~go
func SubscribeTo(c *gin.Context) {
	// 1. 参数获取
	signature := c.Query("signature")
	timestamp := c.Query("timestamp")
	nonce := c.Query("nonce")
	var m map[string]interface{}
	if err := c.ShouldBindJSON(&m); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// 2. 参数解密
	callbackCrypto := dingding.NewDingTalkCrypto("token", "AESKey", "appkey")
	decryptMsg, _ := callbackCrypto.GetDecryptMsg(signature, timestamp, nonce, m["encrypt"].(string))
    
	// 3. 反序列化回调事件json数据
	eventJson := make(map[string]interface{})
	json.Unmarshal([]byte(decryptMsg), &eventJson)
	eventType := eventJson["EventType"].(string)
	subscription := dingding.NewDingSubscribe(eventJson)

	// 4.根据EventType分类处理
	if eventType == "check_url" {
		// 测试回调url的正确性,主要用于首次
		zap.L().Info("测试回调url的正确性\n")
	} else if eventType == "其他事件字段" {
		zap.L().Info("发生了：" + eventType + "事件")
        // 处理事件
	}

	// 5. 返回包含success的加密数据
	successMap, _ := callbackCrypto.GetEncryptMsg("success")
	c.JSON(http.StatusOK, successMap)
}
~~~

1. 获取链接参数并绑定json包到变量m上
2. 使用`token`, `AESKey`, `appkey`做初次验证，将`signature`,` timestamp`,` nonce`, `encrypt`传入`GetDecryptMsg`函数进行解密返回解密数据
3. 反序列化json数据后即可进行事件处理，此json数据中包含`EventType`事件类型以及此其他你所需求的参数，具体见钉钉的[事件订阅汇总清单](https://open.dingtalk.com/document/orgapp/event-list)
4. 根据获得的`EventType`对json数据做出不同处理，像是第一次事件订阅配置时，获得的`EventType`是`check_url`，之后像是用户加入企业（架构）之中则为`user_add_org`
5. 最后返回包含`success`的加密数据即可

钉钉的事件订阅搭配其他应用能够做到很多事情，配合钉钉企业机器人的开发能够实时通知一些事情，同时也能够实时地更新服务器的数据库

但是需要注意，点击保存之后钉钉平台返回的错误信息中不会返回你的接口返回的报错信息，也就是你大概不会知道是如何错的，也许是直到你将程序过一遍之后发现使用你的接口需要验证token，而钉钉平台不会告诉你这个。