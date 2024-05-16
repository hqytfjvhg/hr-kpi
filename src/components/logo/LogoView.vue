<template>
  <div class="logo">
    <img src="~@/assets/logo.png" alt="" />
    <h2 class="title">HR</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: {
        type: Boolean,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  width: 200/16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  line-height: 4rem;
  background-color: #545c64;
  img {
    height: 2rem;
    margin-right: 0.5rem;
  }
  h2 {
    color: #1890ff;
  }
}
</style>
