<template>
  <view class="container">
    <canvas v-show="canvasShow" canvas-id="posterCanvas" class="fullscreen-canvas" z-index="1"></canvas>
    <u-image :src="image" width="100%" height="100%" :show-menu-by-longpress="true"></u-image>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        deviceWidth: 0,
        deviceHeight: 0,
        backgroundImageConfig: {
          url: 'https://jf.sh.189.cn/minio/gov-miniapp/poster/artwork-mini.png',
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        imageList: [
          {
            url: 'https://jf.sh.189.cn/minio/gov-miniapp/d219b959-758b-40c5-a177-0045738efbb21701719789965005421.jpg',
            x: 0.17,
            y: 0.84,
            width: 70,
            height: 70
          }
        ],
        textList: [
          {
            text: '肖小红 18112343455',
            fillStyle: 'white',
            font: '14rpx sans-serif',
            x: 0.375,
            y: 0.87
          }
        ],
        image: '',
        canvasShow: true,
        imageStyle: {}
      }
    },
    created() {
      this.deviceWidth = uni.getSystemInfoSync().windowWidth
      this.deviceHeight = uni.getSystemInfoSync().windowHeight
      this.imageStyle = {
        width: this.backgroundImageConfig.width * 100 + '%',
        height: this.backgroundImageConfig.height * 100 + '%'
      }
    },
    mounted() {
      this.generatePoster('posterCanvas')
    },
    methods: {
      /**
       * https://uniapp.dcloud.net.cn/api/canvas/CanvasContext.html#
       * @returns {Promise<void>}
       */
      async generatePoster(canvasId) {
        // 创建画板
        const context = uni.createCanvasContext(canvasId, this)
        // 添加背景图片
        await this.drawImage(
          context,
          this.backgroundImageConfig.url,
          this.deviceWidth * this.backgroundImageConfig.x,
          this.deviceHeight * this.backgroundImageConfig.y,
          this.deviceWidth * this.backgroundImageConfig.width,
          this.deviceHeight * this.backgroundImageConfig.height
        )

        // 添加其他图片，可以for
        for (const e of this.imageList) {
          await this.drawImage(context, e.url, this.deviceWidth * e.x, this.deviceHeight * e.y, e.width, e.height)
        }

        for (const t of this.textList) {
          // 绘制文字
          context.fillStyle = t.fillStyle // 设置字体颜色为红色
          context.font = t.font // 设置字体大小和字体类型
          context.fillText(t.text, this.deviceWidth * t.x, this.deviceHeight * t.y)
        }

        // 绘画canvas
        this.image = await this.doDrawCanvas(context, canvasId)
        this.canvasShow = false
        this.$u.toast('长按可保存或转发', 5000)
        // 下载canvas
      },
      async drawImage(context, imageUrl, x, y, x1, y1) {
        return new Promise((resolve, reject) => {
          uni.downloadFile({
            url: imageUrl,
            success: async (res) => {
              if (res.statusCode === 200) {
                context.drawImage(res.tempFilePath, x, y, x1, y1)
                resolve(context)
              } else {
                reject()
              }
            }
          })
        })
      },
      async doDrawCanvas(context, canvasId) {
        return new Promise((resolve, reject) => {
          context.draw(false, () => {
            // 生成海报图片
            uni.canvasToTempFilePath(
              {
                canvasId: canvasId,
                success: (res) => {
                  const posterImagePath = res.tempFilePath
                  // 在这里可以将posterImagePath保存到本地，或进行其他操作
                  resolve(posterImagePath)
                },
                fail: (err) => {
                  console.error('Failed to generate poster:', err)
                  reject(err)
                }
              },
              this
            )
          })
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .fullscreen-canvas {
    width: 100%;
    height: 100%;
  }
</style>
