
<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"><!--轮播图-->
      <slot></slot>
    </div>

    <div class="indicator"><!--小圆点插槽-->
      <slot name="indicator" v-if="showIndicator && slideCount>1"><!--当元素个数大于1并且showIndicator为true的时候显示-->
<!--        插槽里面 是根据元素的个数生成小圆点  动态绑定当前活跃的小圆点的样式-->
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {//父传入参数
    interval: {//间隔
      type: Number,
      default: 3000
    },
    animDuration: {//动画持续时间
      type: Number,
      default: 300
    },
    moveRatio: {//移动比率
      type: Number,
      default: 0.25
    },
    showIndicator: {//显示指示器
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    }
  },
  mounted: function () {
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();//一秒后调用这个函数，这个函数是生成小圆圈
      // 2.开启定时器
      this.startTimer();
    }, 5000)
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer: function () {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;//当前index++
        this.scrollContent(-this.currentIndex * this.totalWidth);//调用 滑动 这个函数  把参数传入进去  这里是 -2乘以swiper的宽度（向左走2个图片的宽度）
      }, this.interval)//3秒后调用定时器
    },
    stopTimer: function () {
      window.clearInterval(this.playTimer);//清除定时器
    },
    /**
     * 滚动到正确的位置
     */
    scrollContent: function (currentPosition) {//currentPosition：当前位置
      // 0.设置正在滚动
      this.scrolling = true;
      // 1.开始滚动动画
      this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';//swiper的样式过渡 延时300ms
      this.setTransform(currentPosition);//调用函数
      // 2.判断滚动到的位置
      this.checkPosition();
      // 4.滚动完成
      this.scrolling = false
    },
    /**
     * 校验正确的位置
     */
    checkPosition: function () {
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.swiperStyle.transition = '0ms';//swiper的样式过渡 0ms
        if (this.currentIndex >= this.slideCount + 1) {//当前index >= 元素个数加1
          this.currentIndex = 1;//这里的index最大为4  当元素大于4+1的时候，重新把index赋值
          this.setTransform(-this.currentIndex * this.totalWidth);//调用函数  滚动 把重新赋值的index * swiper的宽度
        } else if (this.currentIndex <= 0) {//当index等于0的时候
          this.currentIndex = this.slideCount;//index 就等于 元素个0
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        // 2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animDuration)//300ms
    },
    /**
     * 设置滚动的位置
     */
    setTransform: function (position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },
    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handleDom: function () {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper');//获取图片的div
      let slidesEls = swiperEl.getElementsByClassName('slide');//获取小圆点
      // 2.保存个数
      this.slideCount = slidesEls.length;//获取小圆点的长度
      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);
    },
    /**
     * 拖动事件的处理
     */
    touchStart: function (e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;
      // 2.停止定时器
      this.stopTimer();
      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },
    touchMove: function (e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;
      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },
    touchEnd: function (e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);
      // 2.判断最终的距离
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
        this.currentIndex++
      }
      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 4.移动完成后重新开启定时器
      this.startTimer();
    },
    /**
     * 控制上一个, 下一个
     */
    previous: function () {
      this.changeItem(-1);
    },
    next: function () {
      this.changeItem(1);
    },
    changeItem: function (num) {
      // 1.移除定时器
      this.stopTimer();
      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 3.添加定时器
      this.startTimer();
    }
  }
}
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}
.swiper {
  display: flex;
}
.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
.indi-item.active {
  background-color: rgba(212,62,46,1.0);
}
</style>
