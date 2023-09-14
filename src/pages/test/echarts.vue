<template>
  <view>
    <canvas canvas-id="myid" id="myid" class="charts" @tap="tap" />
  </view>
</template>
<script>
  import uCharts from '@qiun/ucharts'
  import dayjs from 'dayjs'
  var uChartsInstance = {}
  export default {
    data() {
      return {
        cWidth: 750,
        cHeight: 500
      }
    },
    onReady() {
      //这里的 750 对应 css .charts 的 width
      this.cWidth = uni.upx2px(750)
      //这里的 500 对应 css .charts 的 height
      this.cHeight = uni.upx2px(500)
      this.getServerData()
    },
    methods: {
      getServerData() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          let res = {
            categories: [
              dayjs().add(1, 'year').format('YYYY'),
              dayjs().add(2, 'year').format('YYYY'),
              dayjs().add(3, 'year').format('YYYY'),
              dayjs().add(4, 'year').format('YYYY'),
              dayjs().add(5, 'year').format('YYYY'),
              dayjs().add(6, 'year').format('YYYY')
            ],
            series: [
              {
                name: '目标值',
                data: [35, 36, 31, 33, 13, 34]
              },
              {
                name: '完成量',
                data: [18, 27, 21, 24, 6, 28]
              }
            ]
          }
          dayjs().add(1, 'month').format('YYYY-MM-DD')
          this.drawCharts('myid', res)
        }, 500)
      },
      drawCharts(id, data) {
        const ctx = uni.createCanvasContext(id, this)
        uChartsInstance[id] = new uCharts({
          type: 'column',
          context: ctx,
          width: this.cWidth,
          height: this.cHeight,
          categories: data.categories,
          series: data.series,
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            data: [{ min: 0 }]
          },
          extra: {
            column: {
              type: 'group'
            }
          }
        })
      },
      tap(e) {
        uChartsInstance[e.target.id].touchLegend(e)
        uChartsInstance[e.target.id].showToolTip(e)
      }
    }
  }
</script>

<style>
  .charts {
    width: 750rpx;
    height: 500rpx;
  }
</style>
