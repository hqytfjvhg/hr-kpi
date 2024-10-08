const Phone = [
  {
    path: "/phone/home",
    name: "PhoneHome",
    component: () => import("@/phone-views/home/PhoneHome.vue"),
    meta: {
      requireAuth: false,
      visiable: true,
      info: "手机主页",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
  {
    path: "/phone/my",
    name: "PhoneMy",
    component: () => import("@/phone-views/home/PhoneMy.vue"),
    meta: {
      requireAuth: false,
      visiable: true,
      info: "我的",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
  {
    path: "/phone/login",
    name: "PhoneLogin",
    component: () => import("@/phone-views/login/PhoneLoginV2.vue"),
    meta: {
      requireAuth: false,
      visiable: true,
      info: "手机登录页",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
  {
    path: "/phone/write",
    name: "PhoneWriteV2",
    component: () => import("@/phone-views/value/PhoneWriteV3.vue"),
    meta: {
      requireAuth: true,
      visiable: true,
      info: "手机填写价值观",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
  {
    path: "/phone/details",
    name: "ValueDetails",
    component: () => import("@/phone-views/value/ValueDetails.vue"),
    meta: {
      requireAuth: false,
      visiable: true,
      info: "",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
  {
    path: "/phone/sign",
    name: "PhoneSignV3",
    component: () => import("@/phone-views/sign/PhoneSignV3.vue"),
    meta: {
      requireAuth: false,
      visiable: true,
      info: "手机确认签名",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
  {
    path: "/phone/sign/details",
    name: "PerformDetails",
    component: () => import("@/phone-views/value/PerformDetails.vue"),
    meta: {
      requireAuth: true,
      visiable: true,
      info: "绩效确认",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
  {
    path: "/phone/sign/value",
    name: "ValueList",
    component: () => import("@/phone-views/value/ValueList.vue"),
    meta: {
      requireAuth: true,
      visiable: true,
      info: "价值观列表",
      keepAlive: true,
      icon: "Coordinate",
    },
  },
];

export default Phone;
