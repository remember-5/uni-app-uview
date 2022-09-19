<template>
  <view
    class="zaiui-modal-box"
    :class="show?'show':''"
  >
    <view class="dialog">
      <image
        class="img"
        src="http://oss.bj-gly-zgdx-bzx-icp.caiicloudoss.com/smeapp/7a3bb7ca-726c-4658-ae1d-a3d1fbaed587.png"
        lazy-load
        mode="widthFix"
      />
      <!-- 新版本升级-更新前 -->
      <view
        v-if="!afterShow"
        class="before-box"
      >
        <view class="weizi-main">
          <view class="title-font">
            新版本升级
          </view>
          <view class="cont-font">
            <view>下载新版本安装包以获得</view>
            <view>更好的用户体验</view>
          </view>
        </view>
        <view class="anniulq-main">
          <u-button
            type="error"
            shape="circle"
            :custom-style="{background: '#C72323',width:'100%',height:'84rpx',lineHeight:'56rpx',color:'#ffffff',fontSize:'30rpx'}"
            hover-class="none"
            open-type="contact"
            @click="updateNowBtn"
          >
            马上更新
          </u-button>
        </view>
      </view>
      <!-- 新版本升级-更新后 -->
      <view
        v-if="afterShow"
        class="after-box"
      >
        <view class="weizi-main">
          <view class="title-font">
            新版本升级
          </view>
          <view class="cont-font">
            <view>正在下载安装，请耐心等待…</view>
          </view>
        </view>
        <view class="progress-main">
          <progress
            :percent="percent"
            show-info
            active="true"
            active-mode="forwards"
            backgroundColor="#DDDDDD"
            activeColor="#C72323"
            stroke-width="4"
            border-radius="12rx"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ModalImg',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    afterShow: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Number,
      default: 0 // 百分比0~100
    }
  },
  methods: {
    updateNowBtn() {
      this.$emit('updateNowBtn')
    }

  }
}
</script>

<style lang="scss" scoped>
.zaiui-modal-box {
  position: fixed;
  opacity: 0;
  top: inherit;
  left: inherit;
  right: inherit;
  bottom: inherit;
  z-index: 99999999;
  text-align: center;
  background: rgba(0, 0, 0, 0.54);
  transition: all 0.3s;
  pointer-events: none;

  &::before {
    content: "\200B";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .dialog {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 522 rpx;
    border-radius: 3%;
    height: 608 rpx;

    .img {
      width: 100%;
      border-radius: 3%;
      height: 608 rpx;
    }

    .before-box {
      .weizi-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 9;
        top: 0;
        margin-top: 260 rpx;
        left: 0;
        right: 0;

        .title-font {
          font-size: 38 rpx;
          font-family: SourceHanSansCN-Medium-, SourceHanSansCN-Medium;
          font-weight: normal;
          color: #C72323;
          line-height: 66 rpx;
        }

        .cont-font {
          font-size: 20 rpx;
          font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
          font-weight: normal;
          color: #A5A5A5;
          line-height: 40 rpx;
          margin-top: 30 rpx;
        }
      }

      .anniulq-main {
        width: 310 rpx;
        height: 72 rpx;
        position: absolute;
        bottom: 60 rpx;
        left: 0;
        right: 0;
        margin: 0 auto;

        .btnlq-img {
          width: 310 rpx;
          height: 72 rpx;
        }
      }
    }

    .after-box {
      .weizi-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 9;
        top: 0;
        margin-top: 260 rpx;
        left: 0;
        right: 0;

        .title-font {
          font-size: 38 rpx;
          font-family: SourceHanSansCN-Medium-, SourceHanSansCN-Medium;
          font-weight: normal;
          color: #C72323;
          line-height: 66 rpx;
        }

        .cont-font {
          font-size: 20 rpx;
          font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
          font-weight: normal;
          color: #A5A5A5;
          line-height: 40 rpx;
          margin-top: 60 rpx;
        }
      }

      .progress-main {
        position: absolute;
        bottom: 60 rpx;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0 70 rpx;
      }

      // 进度条
      ::v-deep uni-progress {
        display: block;
        text-align: right;
        color: #A5A5A5;
        font-size: 20 rpx;
      }
    }

  }
}

  .zaiui-modal-box.show {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    pointer-events: auto;
  }
</style>
