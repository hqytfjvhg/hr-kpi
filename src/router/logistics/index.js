import Layout from "@/system-views/logistics/LayoutIndex.vue";

const Back = [
  {
    path: "/admin",
    name: "Admin",
    component: Layout,
    meta: {
      requireAuth: true,
      visiable: true,
      roles: ["ROOT", "HR"],
      info: "菜单",
      keepAlive: false,
      icon: "ForkSpoon",
    },
    children: [
      {
        path: "/admin/menu",
        name: "",
        // component: () => import("@/system-views/logistics/menu/MenuIndex.vue"),
        meta: {
          requireAuth: true,
          visiable: true,
          roles: ["ROOT", "HR"],
          info: "食谱",
          keepAlive: false,
          icon: "ForkSpoon",
        },
        children: [
          {
            path: "/admin/menu/current",
            name: "NowWeek",
            component: () => import("@/system-views/logistics/menu/NowWeek.vue"),
            meta: {
              requireAuth: true,
              visiable: true,
              roles: ["ROOT", "HR"],
              info: "本周",
              keepAlive: false,
              // icon: "ForkSpoon",
            },
          },
          {
            path: "/admin/menu/week",
            name: "MenuWeek",
            component: () => import("@/system-views/logistics/menu/WeeklyMenu.vue"),
            meta: {
              requireAuth: true,
              visiable: true,
              roles: ["ROOT", "HR"],
              info: "制作",
              keepAlive: false,
              // icon: "ForkSpoon",
            },
          },
          {
            path: "/admin/menu/data",
            name: "",
            // component: () => import("@/system-views/logistics/data/HistoricalRecipes.vue"),
            meta: {
              requireAuth: true,
              visiable: true,
              roles: ["ROOT", "HR"],
              info: "食谱库",
              keepAlive: false,
            },
            children: [
              {
                path: "/admin/menu/list",
                name: "FinishDishes",
                component: () => import("@/system-views/logistics/dishes/FinishDishes.vue"),
                meta: {
                  requireAuth: true,
                  visiable: true,
                  roles: ["ROOT", "HR"],
                  info: "成品菜",
                  keepAlive: false,
                },
              },
              {
                path: "/admin/menu/rawMaterials",
                name: "RawMaterials",
                component: () => import("@/system-views/logistics/materials/RawMaterials.vue"),
                meta: {
                  requireAuth: true,
                  visiable: true,
                  roles: ["ROOT", "HR"],
                  info: "原材料",
                  keepAlive: false,
                },
              },
              {
                path: "/admin/menu/key",
                name: "KeyList",
                component: () => import("@/system-views/logistics/key/KeyList.vue"),
                meta: {
                  requireAuth: true,
                  visiable: true,
                  roles: ["ROOT", "HR"],
                  info: "烹饪方法",
                  keepAlive: false,
                  // icon: "ForkSpoon",
                },
              },
              {
                path: "/admin/menu/historical",
                name: "HistoricalRecipes",
                component: () => import("@/system-views/logistics/data/HistoricalRecipes.vue"),
                meta: {
                  requireAuth: true,
                  visiable: true,
                  roles: ["ROOT", "HR"],
                  info: "历史食谱",
                  keepAlive: false,
                },
              },
            ],
          },
          {
            path: "/admin/menu/count",
            name: "Count",
            component: () => import("@/system-views/logistics/count/CountDishes.vue"),
            meta: {
              requireAuth: true,
              visiable: true,
              roles: ["ROOT", "HR"],
              info: "统计",
              keepAlive: false,
            },
            // children: [
            // {
            //   path: "/admin/menu/countSpiciness",
            //   name: "CountSpiciness",
            //   component: () => import("@/system-views/logistics/count/CountSpiciness.vue"),
            //   meta: {
            //     requireAuth: true,
            //     visiable: true,
            //     roles: ["ROOT", "HR"],
            //     info: "辣度",
            //     keepAlive: false,
            //   },
            // },
            // {
            //   path: "/admin/menu/frequency",
            //   name: "CountFrequency",
            //   meta: {
            //     requireAuth: true,
            //     visiable: true,
            //     roles: ["ROOT", "HR"],
            //     info: "频次",
            //     keepAlive: false,
            //   },
            //   children: [
            // {
            //   path: "/admin/menu/countDishes",
            //   name: "CountDishes",
            //   component: () => import("@/system-views/logistics/count/CountDishes.vue"),
            //   meta: {
            //     requireAuth: true,
            //     visiable: true,
            //     roles: ["ROOT", "HR"],
            //     info: "菜品",
            //     keepAlive: false,
            //   },
            // },
            // {
            //   path: "/admin/menu/countNewDishes",
            //   name: "countNewDishes",
            //   component: () => import("@/system-views/logistics/count/CountNew.vue"),
            //   meta: {
            //     requireAuth: true,
            //     visiable: true,
            //     roles: ["ROOT", "HR"],
            //     info: "新菜",
            //     keepAlive: false,
            //   },
            // },
            //   ],
            // },
            // ],
          },
        ],
      },
    ],
  },
];

export default Back;
