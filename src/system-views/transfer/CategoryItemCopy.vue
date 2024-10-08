<template>
  <div class="context">
    <router-link :to="{ name: path }" class="category-item">
      <div class="icon">
        <span><img :src="icon" alt="" style="width: 50px; height: 50px" /></span>
        <span class="text"> {{ name }}</span>
        <!-- <img width="42" :src="icon" alt="image" /> -->
      </div>
      <p class="name">{{ text }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CategoryItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    icon: [String, Object],
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.context {
  // width: 33%;
  padding: 24px;
  border: 0;
  border-radius: 0;
  box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset,
    0 1px 0 0 #f0f0f0 inset;
  transition: all 0.2s;
  &:hover {
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }
}
.category-item {
  text-decoration: none;
  text-align: left;
}
// .el-link {
//   text-decoration: underline;
// }
.icon {
  font-size: 28px;
  margin: 0;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  .text {
    font-size: 1.2rem;
    color: black;
    height: 3rem;
    line-height: 3rem;
  }
}

.name {
  color: #00000073;
  height: 2.5rem;
  margin-top: 0.5rem;
}
</style>
