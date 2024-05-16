<template>
  <div class="move-container">
    <div v-move:[params]="shuffle" :move-x="false" class="avatar" :style="{ lineHeight: !isShow ? '35px' : '20px' }">
      <div style="font-size: 11px; height: 20px; line-height: 20px">可拖动</div>
      自评得分：{{ selfScore }}分
      <div v-if="isShow">管理评分：{{ managerScore }}分</div>
    </div>
    <!-- <div v-move:[params2]="shuffle" class="nickname">昵称</div> -->
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    selfScore: {
      type: Number,
      default: 0,
    },
    managerScore: {
      type: Number,
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    move: {
      mounted(el, binding) {
        const dragBox = el; //获取当前元素
        const boundary = binding.arg?.boundary ?? false; // 控制是否不能超出边界
        const callback =
          binding.value ??
          (() => {
            return null;
          });
        const canMoveX = el.getAttribute("move-x") !== false;
        const canMoveY = el.getAttribute("move-y") !== false;

        dragBox.style.position = "fixed";
        const pdom = dragBox.parentNode;
        boundary && (pdom.style.position = "relative");
        // 父元素宽高
        const pw = pdom.offsetWidth;
        const ph = pdom.offsetHeight;
        // 本身宽高
        const sw = dragBox.offsetWidth;
        const sh = dragBox.offsetHeight * 2; // 在控制父边界情况下避免元素超出范围
        // 计算得到最大移动距离
        const maxw = pw - sw + dragBox.offsetLeft;
        const maxh = ph - sh + dragBox.offsetHeight;
        const minw = 0;
        const minh = 0;

        dragBox.onmousedown = (e) => {
          // 阻止默认事件，避免元素选中
          e.preventDefault();
          dragBox.style.cursor = "move";
          //算出鼠标当前相对元素的位置
          const disX = e.x - dragBox.offsetLeft;
          const disY = e.y - dragBox.offsetTop;

          document.onmousemove = (e2) => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e2.clientX - disX;
            let top = e2.clientY - disY;
            // 相对于父元素的移动百分比
            let percentX = 0;
            let percentY = 0;
            // 当传入true代表控制边界
            if (boundary) {
              left = left > maxw ? maxw : left < minw ? minw : left;
              top = top > maxh ? maxh : top < minh ? minh : top;
              // 计算移动百分比
              percentX = Number(((left / maxw) * 100).toFixed(2));
              percentY = Number(((top / maxh) * 100).toFixed(2));
            }

            //移动当前元素
            canMoveX && (dragBox.style.left = left + "px");
            canMoveY && (dragBox.style.top = top + "px");

            callback({ left, top, percentX, percentY }, binding.arg?.type);
          };
          document.onmouseup = () => {
            //鼠标弹起来的时候不再移动
            document.onmousemove = null;
            document.onmouseup = null;
            dragBox.style.cursor = "default";
          };
        };
      },
    },
  },
  setup() {
    const boundary = ref(true);
    const type = ref("avatar");
    const params = {
      boundary: false,
      type: "avatar",
    };
    // const selfScore = ref(0);
    // const managerScore = ref(0);

    const params2 = {
      boundary: true,
      type: "nickname",
    };
    // const shuffle = (e, type) => {
    //   console.log("e,", e);
    //   console.log("type,", type);
    // };
    return {
      boundary,
      type,
      params,
      params2,
      // selfScore,
      // managerScore,
    };
  },
};
</script>
<style lang="scss" scoped>
.move-container {
  cursor: move;
  .avatar {
    width: 150px;
    height: 70px;
    padding-top: 10px;
    border: 2px solid #e4e7ed;
    position: fixed;
    z-index: 10;
    text-align: center;
    font-size: 14px;
    border-radius: 10px;
    background-color: #fff;
  }

  .nickname {
    width: 48px;
    font-size: 24px;
    color: blue;
  }
}
.move-container:hover {
  cursor: move;
}
</style>
