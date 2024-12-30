const app = getApp()

Page({
    data: {
        pageCardContext: null
    },
    updateLiveCardSize: function() {
        this.data.pageCardContext.updateSize({
            width: 50,
            height: 50
        });
    },
    onLoad() {
        // Do some initialize when page load.
        // this.updateText('onLoad 页面加载');
        // 获取卡片最大宽高
        tt.getLiveRoomCardInfo({
            success(res) {
                console.log('调用成功：', res.liveCardMaxWidth, res.liveCardMaxHeight);
                console.log('liveCard: ', res.liveCardMaxWidth, res.liveCardMaxHeight)
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
                        cardContext.updateSize({
                            width: res.liveCardMaxWidth, // 卡片宽度，建议设置一个小于最大宽度的值
                            height: res.liveCardMaxHeight,
                        })
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
    }
})