<template>
  <div class="home-box">
    <router-view></router-view>
    <Write />
    <!-- <Write v-if="active === 'write'" />
    <Sign v-if="active === 'sign'" />
    {{ active }}
    <van-tabbar v-model="active">
      <van-tabbar-item icon="records-o" name="write" @click="active = 'write'">填写</van-tabbar-item>
      <van-tabbar-item icon="flag-o" name="sign" @click="active = 'sign'">签名</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script setup>
// import TabBar from "./PhoneLayout.vue";
import Write from "../value/PhoneWriteV3.vue";
// import Sign from "../sign/PhoneSignV2.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// const route = useRoute();
const router = useRouter();
const active = ref("");

router.afterEach((to, from) => {
  if (from.name === "ValueList" && to.name === "PhoneHome") {
    console.log(1111);
    console.log(active.value);

    active.value = "sign";
    console.log(active.value);
  } else {
    active.value = "write";
  }
});

onMounted(() => {
  active.value = "write";
});
</script>

<style lang="scss" scoped>
// .home-box {
//   width: 100%;
//   height: 100%;
//   background-image: linear-gradient(#8feee5, #bdf8d2);
//   .home-main {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }
// }
</style>
