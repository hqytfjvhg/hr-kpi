<template>
  <div>
    <router-link :to="{ name: name, path: path }" class="category-item">
      <div class="icon">
        <img :src="icon" alt="" style="width: 50px; height: 50px" />
      </div>
      <div class="name">
        {{ title }}
      </div>
      <div class="text">{{ text }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CategoryItem",
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
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
.category-item {
  z-index: 10;
  display: flex;
  background-color: #fff;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  // border: 1px solid #e1e1e5;
  box-shadow: 0 2px 9px -2px rgba(50, 71, 92, 0.06), 0 4px 9px 1px rgba(50, 71, 92, 0.04),
    0 2px 6px 4px rgba(50, 71, 92, 0.02);
  transform: translateX(0) translateY(0) translateZ(0);
  transition: all 0.4s ease;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: left;

  &:hover {
    // transform: translateX(0) translateY(-12px) translateZ(0);
    box-shadow: 0 8px 24px rgba(32, 43, 54, 0.12);
    color: #fff !important;
    background-image: url("@/assets/service-bg.jpg");
    background-position: right top;
    background-repeat: no-repeat;
    background-size: cover;
    :deep(.name) {
      color: #fff !important;
    }
    :deep(.text) {
      color: #fff !important;
    }
  }
  .icon {
    font-size: 30px;
    text-align: left;
    width: 100%;
  }

  .name {
    width: 100%;
    font-size: 20px;
    margin-bottom: 0;
    margin-top: 16px;
    font-family: Arial, Helvetica, sans-serif;
    color: #212529;
    font-weight: 700;
  }
  .text {
    width: 100%;
    margin: 20px 0;
    font-size: 15px;
    line-height: 30px;
    font-weight: 300;
    color: #afafaf;
  }
}
// .el-link {
//   text-decoration: underline;
// }
</style>
