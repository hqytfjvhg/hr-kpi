import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/login/LoginView.vue";
// import LoginView2 from "../views/login/LoginView2.vue";
import i18n from "../language";
// import InputTarget from "@/views/performance/InputTarget.vue";
import Transfer from "../router/transfer/index";
import Back from "../router/logistics/index";
import Phone from "../router/phone/index";
import { isMobile } from "../utils/isMobile";

let routes = [
  {
    path: "/",
    redirect: "/kpi/login",
  },

  {
    path: "/kpi/login",
    name: "login",
    component: LoginView,
  },

  // {
  //   path: "/kpi/register",
  //   name: "register",
  //   component: () => import("../views/register/RegisterView.vue"),
  // },

  {
    path: "/kpi/administrator",
    name: "homeView",
    component: HomeView,
    meta: {
      info: "首页",
      keepAlive: true,
    },
    children: [
      //管理员主页
      {
        path: "/kpi/administrator/dashboard",
        name: "mainHome",
        component: () => import("@/components/main/MainHome.vue"),
        meta: {
          requireAuth: true,
          visiable: true,
          roles: ["ROOT"],
          info: i18n.global.t("home"),
          keepAlive: false,
          icon: "Coordinate",
        },
      },
      //部门负责人主页
      {
        path: "/kpi/employee/dashboard/manager",
        name: "frontView",
        component: () => import("@/components/main/FrontView.vue"),
        meta: {
          requireAuth: true,
          visiable: true,
          roles: ["DEPTMANAGER", "HRMANAGER"],
          info: i18n.global.t("home"),
          keepAlive: false,
          icon: "Coordinate",
        },
      },
      //员工主页
      {
        path: "/kpi/employee/dashboard",
        name: "employeeView",
        component: () => import("@/components/main/EmployeeView.vue"),
        meta: {
          requireAuth: true,
          visiable: true,
          roles: ["EMPLOYEE"],
          info: i18n.global.t("home"),
          keepAlive: false,
          icon: "Coordinate",
        },
      },
      //温总主页
      {
        path: "/kpi/employee/dashboard/special",
        name: "specialView",
        component: () => import("@/components/main/SpecialView.vue"),
        meta: {
          requireAuth: true,
          visiable: true,
          roles: ["DEPTMANAGER"],
          info: i18n.global.t("home"),
          keepAlive: false,
          icon: "Coordinate",
        },
      },
      //文员主页
      {
        path: "/kpi/employee/dashboard/clerk",
        name: "clerkView",
        component: () => import("@/components/main/ClerkView.vue"),
        meta: {
          requireAuth: true,
          roles: ["CLERK"],
          info: i18n.global.t("home"),
          keepAlive: false,
          icon: "Coordinate",
        },
      },
      //人事主页
      {
        path: "/kpi/employee/dashboard/hr",
        name: "hrView",
        component: () => import("@/components/main/HrView.vue"),
        meta: { requireAuth: true, roles: ["HR"], info: i18n.global.t("home"), keepAlive: false, icon: "Coordinate" },
      },

      {
        path: "/kpi/employee/about",
        name: "aboutInfo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/values/AboutView.vue"),
        meta: {
          requireAuth: true,
          roles: ["HR", "HRMANAGER", "DEPTMANAGER", "EMPLOYEE", "CLERK"],
          info: i18n.global.t("toDoList"),
          keepAlive: false,
          icon: "Calendar",
        },
      },
      //弃用
      // {
      //   path: "/kpi/userInfo",
      //   name: "userInfo",
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ "../views/userlist/UserInfo.vue"),
      //   meta: { info: "个人信息" },
      // },

      // {
      //   path: "/kpi/valueManage",
      //   name: "valueManage",
      //   component: () => import("@/views/values/ValueManagement.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "价值观列表" },
      // },
      // {
      //   path: "/kpi/deptCommon",
      //   name: "deptCommon",
      //   component: () => import("../views/userlist/DeptCommon.vue"),
      //   meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: "部门审批流程" },
      // },
      // {
      //   path: "/kpi/hrCommon",
      //   name: "hrCommon",
      //   component: () => import("../views/userlist/HrCommon.vue"),
      //   meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: "人事审批流程" },
      // },
      //弃用
      // {
      //   path: "/kpi/valueUser",
      //   name: "valueUser",
      //   component: () => import("../views/values/ValueUser.vue"),
      //   meta: { info: "查询个人价值观" },
      // },

      // {
      //   path: "/kpi/valueDeptDetails",
      //   name: "valueDeptDetails",
      //   component: () => import("../views/values/ValueDeptDetails.vue"),
      //   meta: {
      //     requireAuth: true,
      //     visiable: true,
      //     roles: ["ROOT", "HRMANAGER", "DEPTMANAGER"],
      //     info: "部门价值观详情",
      //   },
      // },

      //弃用
      // {
      //   path: "/kpi/valueDept",
      //   name: "valueDept",
      //   component: () => import("../views/values/ValueDept.vue"),
      //   meta: {
      //     requireAuth: true,
      //     visiable: true,
      //     roles: ["ROOT", "HR", "MANAGER"],
      //     info: "查询部门价值观得分",
      //   },
      // },
      //弃用
      // {
      //   path: "/kpi/createModel",
      //   name: "createModel",
      //   component: () => import("../views/values/CreateModel.vue"),
      //   meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: "事件发布" },
      // },

      // {
      //   path: "/kpi/publishEvent",
      //   name: "publishEvent",
      //   component: () => import("../views/publish/PublishEvent.vue"),
      //   meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: "事件发布" },
      // },
      // {
      //   path: "/kpi/publishHistory",
      //   name: "publishHistory",
      //   component: () => import("../views/publish/PublishHistory.vue"),
      //   meta: {
      //     requireAuth: true,
      //     visiable: true,
      //     roles: ["ROOT"],
      //     info: "发布历史与流程详情",
      //   },
      // },

      {
        path: "/kpi/employee/input/value",
        name: "writeValue",
        component: () => import("../views/values/WriteValueRecopy.vue"),
        meta: {
          requireAuth: false,
          info: i18n.global.t("wirteValue"),
          keepAlive: false,
          roles: ["HR", "HRMANAGER", "DEPTMANAGER", "EMPLOYEE", "CLERK"],
        },
      },
      {
        path: "/kpi/employee/input/review",
        name: "reviewByUserId",
        component: () => import("../views/values/ReviewByUserIdCopy.vue"),
        meta: {
          requireAuth: false,
          visiable: true,
          roles: ["HR", "DEPTMANAGER", "HRMANAGER"],
          info: i18n.global.t("approvalVale"),
          keepAlive: false,
        },
      },
      // {
      //   path: "/kpi/searchLog",
      //   name: "SearchLog",
      //   component: () => import("../views/log/SearchLog.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "操作日志" },
      // },
      // {
      //   path: "/kpi/searchLogDoc",
      //   name: "SearchLogDoc",
      //   component: () => import("../views/log/SearchLogDoc.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "日志文件" },
      // },

      // {
      //   path: "/kpi/targetList",
      //   name: "targetList",
      //   component: () => import("@/views/performance/TargetList.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "指标列表" },
      // },
      // {
      //   path: "/kpi/targetApproval",
      //   name: "targetApproval",
      //   component: () => import("@/views/performance/ApprovalProcess.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "指标审批流程" },
      // },
      //弃用
      // {
      //   path: "/kpi/reviewPerformance",
      //   name: "reviewPerformance",
      //   component: () => import("@/views/performance/ReviewPerformance.vue"),
      //   meta: {
      //     requireAuth: false,
      //     roles: ["HR", "DEPTMANAGER", "HRMANAGER"],
      //     info: i18n.global.t("approvalPerformance"),
      //     keepAlive: false,
      //   },
      // },
      //弃用
      // {
      //   path: "/kpi/tagView",
      //   name: "tagView",
      //   component: () => import("@/components/header/HeaderTagview.vue"),
      //   meta: { info: "多页签" },
      // },

      // {
      //   path: "/kpi/performanceDeptDetails",
      //   name: "performanceDeptDetails",
      //   component: () => import("@/views/performance/PerformanceDeptDetails.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "部门业绩详情" },
      // },

      //弃用
      // {
      //   path: "/kpi/performanceDept",
      //   name: "performanceDept",
      //   component: () => import("@/views/performance/PerformanceDept.vue"),
      //   meta: { info: "查询部门业绩得分" },
      // },
      //弃用
      // {
      //   path: "/kpi/kpiDept",
      //   name: "kpiDept",
      //   component: () => import("@/views/kpi/KpiDept.vue"),
      //   meta: { info: "计算KPI数值" },
      // },
      //弃用
      // {
      //   path: "/kpi/kpiHistory",
      //   name: "kpidHistory",
      //   component: () => import("@/views/kpi/KpiHistory.vue"),
      //   meta: { info: "奖金系数", keepAlive: false },
      // },

      // {
      //   path: "/kpi/kpiScore",
      //   name: "kpiScore",
      //   component: () => import("@/views/kpi/KpiScore.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "KPI得分", keepAlive: false },
      // },
      // {
      //   path: "/kpi/personalAssessment",
      //   name: "personalAssessment",
      //   component: () => import("@/views/kpi/PersonalAssessment.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT"], info: "个人绩效月考评表" },
      // },
      //弃用
      // {
      //   path: "/kpi/rootDataVisual",
      //   name: "rootDataVisual",
      //   component: () => import("@/views/visualization/RootDataVisual.vue"),
      //   meta: { info: "数据展示" },
      // },

      // {
      //   path: "/kpi/tableDataVisual",
      //   name: "tableDataVisual",
      //   component: () => import("@/views/visualization/TableDataVisual.vue"),
      //   meta: { requireAuth: true, roles: ["ROOT", "DEPTMANAGER", "HRMANAGER"], info: "部门考核汇总表" },
      // },

      {
        path: "/kpi/administrator/bonusCoefficient",
        name: "bonusCoefficient",
        component: () => import("@/views/annualAverage/BonusCoefficient.vue"),
        meta: { requireAuth: false, roles: ["ROOT"], info: i18n.global.t("bounsDetail"), keepAlive: false },
      },
      {
        path: "/kpi/administrator/KPIDetail",
        name: "KPIScoreDetail",
        component: () => import("@/views/annualAverage/KPIScore.vue"),
        meta: { requireAuth: false, roles: ["ROOT"], info: i18n.global.t("kpiDetail"), keepAlive: false },
      },
      {
        path: "/kpi/administrator/valueScore",
        name: "valueScore",
        component: () => import("@/views/annualAverage/ValueScore.vue"),
        meta: { requireAuth: false, roles: ["ROOT"], info: i18n.global.t("valueDetail"), keepAlive: false },
      },
      // {
      //   path: "/kpi/targetLibrary",
      //   name: "targetLibrary",
      //   component: () => import("@/views/kpi/TargetLibrary.vue"),
      //   meta: { requireAuth: true, roles: ["HR", "HRMANAGER", "DEPTMANAGER"], info: "部门指标库" },
      // },
      //弃用
      // {
      //   path: "/kpi/inputTarget",
      //   name: "inputTarget",
      //   component: InputTarget,
      //   meta: { info: "录入指标", keepAlive: false },
      // },
      {
        path: "/kpi/employee/sign",
        name: "signatureVisual",
        component: () => import("@/views/visualization/SignatureVisual.vue"),
        meta: {
          requireAuth: true,
          roles: ["HR", "HRMANAGER", "DEPTMANAGER", "EMPLOYEE", "CLERK"],
          info: i18n.global.t("performanceConfirm"),
          icon: "CircleCheck",
        },
      },
      {
        path: "/kpi/employee/input/target",
        name: "inputTarget",
        component: () => import("@/views/performance/InputTargetCopy.vue"),
        meta: { roles: ["HR", "HRMANAGER", "DEPTMANAGER"], info: i18n.global.t("inputTarget"), keepAlive: false },
      },
      {
        path: "/kpi/404",
        name: "404",
        component: () => import("../views/404.vue"),
        meta: { requireAuth: false, roles: ["ROOT", "HR", "HRMANAGER", "DEPTMANAGER", "EMPLOYEE", "CLERK"] },
      },
      {
        path: "/kpi/administrator/KPI",
        name: "kpi",
        meta: {
          requireAuth: true,
          roles: ["ROOT", "DEPTMANAGER", "HRMANAGER", "HR"],
          info: i18n.global.t("kpi"),
          icon: "StarFilled",
          color: "#e6a23c",
        },
        children: [
          {
            path: "/kpi/administrator/KPI/score",
            name: "kpiScore",
            component: () => import("../views/kpi/KpiScore.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("kpiScore"), keepAlive: false },
          },
          {
            path: "/kpi/administrator/KPI/signList",
            name: "personalAssessment",
            component: () => import("../views/kpi/PersonalAssessment.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("kpiAppraisal") },
          },

          {
            path: "/kpi/employee/target/list",
            name: "targetLibrary",
            component: () => import("../views/kpi/TargetLibrary.vue"),
            meta: { requireAuth: true, roles: ["HR", "HRMANAGER", "DEPTMANAGER"], info: "部门指标库" },
          },
          {
            path: "/kpi/administrator/KPI/table",
            name: "tableDataVisual",
            component: () => import("../views/visualization/TableDataVisual.vue"),
            meta: {
              requireAuth: true,
              roles: ["ROOT", "DEPTMANAGER", "HRMANAGER"],
              info: i18n.global.t("deptAssessment"),
            },
          },
          {
            path: "/kpi/employee/valueDeptDetails",
            name: "deptDetails",
            component: () => import("../views/values/ValueDeptDetails.vue"),
            meta: {
              requireAuth: true,
              roles: ["HRMANAGER", "DEPTMANAGER"],
              info: i18n.global.t("valueDeptDetail"),
            },
          },
        ],
      },
      {
        path: "/kpi/administrator/event",
        name: "",
        meta: {
          requireAuth: true,
          roles: ["ROOT"],
          info: i18n.global.t("event"),
          icon: "StarFilled",
          color: "#e6a23c",
        },
        children: [
          {
            path: "/kpi/administrator/event/publish",
            name: "publishEvent",
            component: () => import("../views/publish/PublishEvent.vue"),
            meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: i18n.global.t("eventPublish") },
          },
          {
            path: "/kpi/administrator/event/history",
            name: "publishHistory",
            component: () => import("../views/publish/PublishHistory.vue"),
            meta: {
              requireAuth: true,
              visiable: true,
              roles: ["ROOT"],
              info: i18n.global.t("eventHistory"),
            },
          },
          // {
          //   path: "/kpi/administrator/event/addHistoryData",
          //   name: "addData",
          //   meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("addData") },
          //   component: () => import("../views/addData/AddData.vue"),
          // },
        ],
      },
      {
        path: "/kpi/administrator/value",
        name: "",
        meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("value"), icon: "SetUp" },
        children: [
          {
            path: "/kpi/administrator/value/list",
            name: "valueManage",
            component: () => import("@/views/values/ValueManagement.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("valueList") },
          },
          {
            path: "/kpi/administrator/value/deptCommon",
            name: "deptCommon",
            component: () => import("../views/userlist/DeptCommon.vue"),
            meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: i18n.global.t("valueDeptCommon") },
          },
          {
            path: "/kpi/administrator/value/hrCommon",
            name: "hrCommon",
            component: () => import("../views/userlist/HrCommon.vue"),
            meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: i18n.global.t("valueHrCommon") },
          },
          {
            path: "/kpi/administrator/value/deptDetails",
            name: "valueDeptDetails",
            component: () => import("../views/values/ValueDeptDetails.vue"),
            meta: {
              requireAuth: true,
              visiable: true,
              roles: ["ROOT"],
              info: i18n.global.t("valueDeptDetail"),
            },
          },
        ],
      },
      {
        path: "/kpi/administrator/target",
        name: "",
        meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("performance"), icon: "ScaleToOriginal" },
        children: [
          {
            path: "/kpi/administrator/target/list",
            name: "targetList",
            component: () => import("@/views/performance/TargetList.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("targetList") },
          },
          {
            path: "/kpi/administrator/target/approval",
            name: "targetApproval",
            component: () => import("@/views/performance/ApprovalProcess.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("performanceApproval") },
          },
          {
            path: "/kpi/administrator/target/deptDetails",
            name: "performanceDeptDetails",
            component: () => import("@/views/performance/PerformanceDeptDetails.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("performanceDeptDetail") },
          },
        ],
      },
      {
        path: "/kpi/administrator/user",
        name: "",

        meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: i18n.global.t("user"), icon: "User" },
        children: [
          {
            path: "/kpi/administrator/user/list",
            name: "UserList",
            meta: { requireAuth: true, visiable: true, roles: ["ROOT"], info: i18n.global.t("userList") },
            component: () => import("../views/userlist/UserList.vue"),
          },
        ],
      },
      {
        path: "/kpi/administrator/log",
        name: "",
        meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("log"), icon: "Tickets" },
        children: [
          {
            path: "/kpi/administrator/log/list",
            name: "SearchLog",
            component: () => import("../views/log/SearchLog.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("logList") },
          },
          {
            path: "/kpi/administrator/log/doc",
            name: "SearchLogDoc",
            component: () => import("../views/log/SearchLogDoc.vue"),
            meta: { requireAuth: true, roles: ["ROOT"], info: i18n.global.t("logDoc") },
          },
        ],
      },
    ],
  },
  // {
  //   path: "/kpi/loginView2",
  //   name: "loginView2",
  //   component: LoginView2,
  // },
  {
    path: "/kpi/employee/sign/phone",
    name: "phoneSign",
    component: () => import("@/views/visualization/PhoneSign.vue"),
    meta: { info: "手机签名" },
  },
  {
    path: "/kpi/employee/sign/phoneCopy",
    name: "phoneSignCopy",
    component: () => import("@/views/visualization/PhoneSignCopy.vue"),
    meta: { info: "手机签名复制" },
  },
];

// export const asyncRoutes=[{

// }]
// console.log(routes[2].children, "路由");

let router = createRouter({
  history: createWebHashHistory(),
  routes,
});

Transfer.forEach((item) => {
  routes.push(item);
  router.addRoute(item);
});
Back.forEach((item) => {
  routes.push(item);
  router.addRoute(item);
});
Phone.forEach((item) => {
  routes.push(item);
  router.addRoute(item);
});

router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  //准备跳到登录页放行
  // if (to.path === "/login") return next();
  // if (to.path === "/register") return next();
  //网页正常点击登录按钮
  let token = localStorage.getItem("token");
  //单独对手机签控制
  if (to.name == "phoneSign" || to.name == "phoneSignCopy") {
    // console.log(to);
    // 分离出查询字符串
    const queryStartIndex = to.fullPath.indexOf("?");
    const query = queryStartIndex !== -1 ? to.fullPath.slice(queryStartIndex + 1) : "";

    // 创建URLSearchParams对象
    const params = new URLSearchParams(query);

    // 提取token和name
    token = params.get("token");
    const name = params.get("name");
    store.commit("changeName", name);
    store.commit("changeToken", token);
  }
  //未登录，没有token
  if (token == "" || token == null) {
    if (to.name == "login" || to.name == "register" || to.name == "SysLogin" || to.name == "PhoneLogin") {
      document.title = "绩效-OA";
      next();
    } else {
      // if (
      //   to.name == "mainHome" ||
      //   to.name == "frontView" ||
      //   to.name == "employeeView" ||
      //   to.name == "specialView" ||
      //   to.name == "clerkView" ||
      //   to.name == "hrView"
      // ) {
      //   document.title = "面板-绩效";
      // } else {
      //   document.title = "HR绩效管理平台";
      // }
      console.log("请先登录");
      if (isMobile()) {
        next("/phone/login");
      } else {
        if (store.state.role == "ROOT") {
          console.log(1);
          next("/sys/login");
        } else {
          console.log(2);
          next("/kpi/login");
        }
      }
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (
    to.name === "mainHome" ||
    to.name === "frontView" ||
    to.name === "employeeView" ||
    to.name === "specialView" ||
    to.name === "clerkView" ||
    to.name === "hrView"
  ) {
    document.title = "面板-绩效";
  } else {
    if (isMobile()) {
      document.title = "绩效管理平台";
    } else {
      document.title = "HR绩效管理平台";
    }
  }
});

export default router;
