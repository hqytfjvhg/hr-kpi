const Transfer = [
  {
    path: "/sys/login",
    name: "SysLogin",
    component: () => import("@/system-views/login/SystemLogin.vue"),
    meta: {
      requireAuth: true,
      visiable: true,
      roles: ["ROOT", "HR"],
      info: "系统登录页",
      keepAlive: false,
      icon: "Coordinate",
    },
  },
  {
    path: "/sys/transfer",
    name: "transfer",
    component: () => import("@/system-views/transfer/TransferIndex.vue"),
    meta: {
      requireAuth: true,
      visiable: true,
      roles: ["ROOT", "HR"],
      info: "中转站",
      keepAlive: false,
      icon: "Coordinate",
    },
  },
];

export default Transfer;
