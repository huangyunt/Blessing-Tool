const app = getApp()

const customCreateLiveCard = () => {
    // Do some initialize when page load.
    // this.updateText('onLoad 页面加载');
    // 获取卡片最大宽高
    tt.getLiveRoomCardInfo({
        success(res) {
            // console.log('调用成功：', res.liveCardMaxWidth, res.liveCardMaxHeight);
            // console.log('liveCard: ', res.liveCardMaxWidth, res.liveCardMaxHeight)
            // 启动玩法
            tt.createLiveCard({
                url: '/live-card/game',
                width: res.liveCardMaxWidth, // 卡片宽度，建议设置一个小于最大宽度的值
                height: res.liveCardMaxHeight, // 卡片高度，建议设置一个小于最大高度的值
                success: async ({
                    cardContext,
                    errMsg
                }) => {
                    console.info('Card created!', cardContext, errMsg);
                    cardContext.onPageMessage('页面给玩法卡片发送消息了'); // 发送数据
                },
                fail: ({
                    errMsg
                }) => {
                    console.error('Create card error: ', errMsg);
                },
            })
        },
        fail(res) {
            console.log('调用失败：', res.errMsg);
        }
    })


    // 消息订阅，messageType 是个数组，可以按需订阅
    tt.subscribeLiveInteractPluginMessage({
        messageType: ['live_like', 'live_comment', 'live_gift', 'live_follow', 'live_fansclub'],
        success: (res) => {
            console.log('消息订阅成功');
            // 在订阅成功的回调中，去开启消息通道监听
            tt.onReceiveLiveInteractPluginMessage((payload) => {
                // 实际的消息返回，只有申请了对应的开放数据权限，才会返回对应的消息、接口数据
                console.log('payload: ', payload);
            })
        },
        fail: (error) => {
            console.log('消息订阅失败：', error);
        }
    })
}

Page({
    data: {
        pageCardContext: null,
        pageData: {
            name: ''
        }
    },

    onLoad() {
        console.log("配置面板成功打开")
    },

    createLiveCard() {
        // Do some initialize when page load.
        // this.updateText('onLoad 页面加载');
        // 获取卡片最大宽高
        tt.getLiveRoomCardInfo({
            success(res) {
                // console.log('调用成功：', res.liveCardMaxWidth, res.liveCardMaxHeight);
                // console.log('liveCard: ', res.liveCardMaxWidth, res.liveCardMaxHeight)
                // 启动玩法
                tt.createLiveCard({
                    url: '/live-card/game',
                    width: res.liveCardMaxWidth, // 卡片宽度，建议设置一个小于最大宽度的值
                    height: res.liveCardMaxHeight, // 卡片高度，建议设置一个小于最大高度的值
                    success: async ({
                        cardContext,
                        errMsg
                    }) => {
                        console.info('Card created!', cardContext, errMsg);
                        cardContext.onPageMessage('页面给玩法卡片发送消息了'); // 发送数据
                    },
                    fail: ({
                        errMsg
                    }) => {
                        console.error('Create card error: ', errMsg);
                    },
                })
            },
            fail(res) {
                console.log('调用失败：', res.errMsg);
            }
        })


        // 消息订阅，messageType 是个数组，可以按需订阅
        tt.subscribeLiveInteractPluginMessage({
            messageType: ['live_like', 'live_comment', 'live_gift', 'live_follow', 'live_fansclub'],
            success: (res) => {
                console.log('消息订阅成功');
                // 在订阅成功的回调中，去开启消息通道监听
                tt.onReceiveLiveInteractPluginMessage((payload) => {
                    // 实际的消息返回，只有申请了对应的开放数据权限，才会返回对应的消息、接口数据
                    console.log('payload: ', payload);
                })
            },
            fail: (error) => {
                console.log('消息订阅失败：', error);
            }
        })
    },

    exitLiveCard() {
        tt.exitMiniProgram({
            success() {
                console.log("exited");
            },
        });
    }

    // postMessageToLiveCard: function() {
    //     app.globalCanvas.onPageMessage('页面给玩法卡片发送消息了'); // 发送数据
    // }
})