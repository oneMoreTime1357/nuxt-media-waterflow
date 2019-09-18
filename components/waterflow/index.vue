<template>
  <div class="flow-con" :id="containId" :style="{'width': contentWidth + 'px', 'height': contentHeight + 'px'}">
    <slot></slot>
    <card v-for="item in lists" :item="item" :key="item.id"></card>
  </div>
</template>

<script>
import card from '~/components/card'

export default {
  data () {
    return {
      pageWidth: 0,
      contentWidth: 0,
      contentHeight: 0
    }
  },
  props: {
    containId: {
      type: String,
      require: true
    },
    lists: {
      type: Array,
      default: []
    },
    isRight: Boolean
  },
  components: {
    card
  },
  watch: {
    lists (val) {
      if (val) {
        // console.log('数据发生变化', val)
        let that = this
        this.$nextTick(() => {
          // console.log(this.lists)
          that.waterflow()
        })
      }
    }
  },
  mounted () {
    this.pageWidth = this.getClientWidth().width
    let that = this
    this.$nextTick(() => {
      // console.log(this.lists)
      that.waterflow()
    })
  },
  methods: {
    waterflow () {
      if (this.lists.length <= 0) {
        return
      }

      let childs = $('#' + this.containId).children()

      let space = 20
      let itemWidth = childs[0].offsetWidth
      let cloumns = parseInt(this.pageWidth / (itemWidth + space))
      this.contentWidth = parseInt(cloumns * (itemWidth + space))
      // console.log(itemWidth, 22, cloumns, this.contentWidth)
      // console.log(childs, childs.length, Array.from(childs))
      let childList = Array.from(childs)
      // console.log(childList)
      let heightArry = new Array(cloumns)

      for (let index = 0; index < childList.length; index++) {
        const element = childList[index];
        // console.log(element)
        if (index < cloumns) {
          // 元素第一行
          if (this.isRight) {
            if (index === 0) { // 第一条广告元素
              // console.log(element, 333333)

              heightArry[cloumns - 1] = {
                height: element.offsetHeight,
                offsetLeft: (itemWidth + space) * (cloumns - 1)
              }
            } else {
              element.style.top = 0
              let left = (itemWidth + space) * (index - 1)
              // console.log(left, 3333)
              element.style.left = left + 'px'
              heightArry[index - 1] = {
                height: element.offsetHeight,
                offsetLeft: left
              }
            }
          } else {
            element.style.top = 0
            let left = (itemWidth + space) * index
            // console.log(left, 3333)
            element.style.left = left + 'px'
            heightArry[index] = {
              height: element.offsetHeight,
              offsetLeft: left
            }
          }
          // console.log(element, heightArry)
        } else {
          let minIndex = 0
          let minHeight = heightArry[0].height
          for (let i = 0; i < heightArry.length; i++) {
            const elem = heightArry[i]
            if (minHeight > elem.height) {
              minIndex = i
              minHeight = elem.height
            }
          }

          element.style.top = minHeight + space + 'px'
          element.style.left = heightArry[minIndex].offsetLeft + 'px'
          heightArry[minIndex].height = minHeight + element.offsetHeight + space
        }
      }

      this.contentHeight = this.maxPageHeight(heightArry)
      this.$emit('paintSuccess', true)
    },
    maxPageHeight (heightArr) {
      let maxH = heightArr[0].height
      // console.log(heightArr)
      for (let index = 0; index < heightArr.length; index++) {
        if (!heightArr[index]) {
          break
        }
        const elHeight = heightArr[index].height
        if (elHeight > maxH) {
          maxH = elHeight
        }
      }
      return maxH
    },
    getClientWidth () {
      return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      }
    },
  }
}
</script>

<style lang="less">
  .flow-con {
    position: relative;
    margin: 0 auto;
  }
</style>


