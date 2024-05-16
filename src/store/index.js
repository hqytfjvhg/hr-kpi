import { createStore } from "vuex";
// import { getToken, saveToken } from "@/utils/storage";

export default createStore({
  state: {
    registerIdentifyUuid: "",
    userId: localStorage.getItem("userid") ? localStorage.getItem("userid") : "",
    name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
    deptId: localStorage.getItem("deptId") ? JSON.parse(localStorage.getItem("deptId")) : "",
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : "",
    number: localStorage.getItem("number") ? localStorage.getItem("number") : "",
    number2: localStorage.getItem("number2") ? localStorage.getItem("number2") : "",
    deptList: [], //部门列表
    currentUserId: localStorage.getItem("currentUserId") ? localStorage.getItem("currentUserId") : "", //价值观当前审批人
    // currentDeptName: localStorage.getItem("currentDeptName") ? localStorage.getItem("currentDeptName") : "", //价值观当前审批人所属部门，用户部门筛选
    currentUserIdList: localStorage.getItem("currentUserIdList") ? localStorage.getItem("currentUserIdList") : [], //业绩批量审批人
    currentState: localStorage.getItem("currentState") ? localStorage.getItem("currentState") : "", //价值观当前审批的是部门负责人还是人事
    // todoList: (JSON.stringify(undefined) && JSON.parse(localStorage.getItem("todoList"))) || [], //json.parse无法解析undefi
    approvalData: [], //事件下模板的数据
    currentName: localStorage.getItem("currentName") ? localStorage.getItem("currentName") : "", //价值观、业绩当前部门名字、管理员去帮填价值观员工名字
    // userSelectName: [],
    userList: [],
    // selectUser: [], //某一模板存着选中的人名，用于备份做对比
    modelFinishState: [], //存储当前事件的完成状态和时间线
    modelFinishPerformance: [], //存储当前事件的业绩excel数据和时间线
    tags: [], //多页签存的数据
    //tagsview标签显示隐藏
    isCollapse: false,

    criticalMonth: localStorage.getItem("criticalMonth") ? localStorage.getItem("criticalMonth") : "", //临界月份
    yearOptions: localStorage.getItem("yearOptions") ? localStorage.getItem("yearOptions") : [],
    monthOptions: [
      { monthId: 1, month: "1" },
      { monthId: 2, month: "2" },
      { monthId: 3, month: "3" },
      { monthId: 4, month: "4" },
      { monthId: 5, month: "5" },
      { monthId: 6, month: "6" },
      { monthId: 7, month: "7" },
      { monthId: 8, month: "8" },
      { monthId: 9, month: "9" },
      { monthId: 10, month: "10" },
      { monthId: 11, month: "11" },
      { monthId: 12, month: "12" },
    ],
    deptOptions: localStorage.getItem("deptOptions") ? JSON.parse(localStorage.getItem("deptOptions")) : [],
    year: localStorage.getItem("year") ? localStorage.getItem("year") : "", //存储年份
    valueResult: localStorage.getItem("valueResult") ? localStorage.getItem("valueResult") : [], //存储价值观待办事件的详情
    eventMonth: localStorage.getItem("eventMonth") ? localStorage.getItem("eventMonth") : "", //最新月份
    eventSave: localStorage.getItem("eventSave") ? localStorage.getItem("eventSave") : null, //事件是否保存的标识
    langType: localStorage.getItem("langType") ? localStorage.getItem("langType") : null, //当前语言
  },
  getters: {},
  mutations: {
    changeUuid(state, payload) {
      state.registerIdentifyUuid = payload;
      // console.log(state.registerIdentifyUuid);
    },
    changeUserId(state, payload) {
      state.userId = payload;
      localStorage.setItem("userid", payload);
    },
    changeToken(state, payload) {
      state.token = payload;
      localStorage.setItem("token", payload);
      // saveToken(payload);
    },
    changeRole(state, payload) {
      state.role = payload;
      localStorage.setItem("role", payload);
      // console.log(payload);
      // console.log("store.state.role", state.role);
    },
    changeName(state, payload) {
      state.name = payload;
      localStorage.setItem("name", payload);
      // console.log(payload);
    },
    changeDeptId(state, payload) {
      state.deptId = payload;
      localStorage.setItem("deptId", payload);
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    //存储价值观待办事件的详情
    changeValueResult(state, payload) {
      state.valueResult = payload;
      localStorage.setItem("valueResult", JSON.stringify(payload));
    },
    changeNumber(state, payload) {
      state.number = payload;
      localStorage.setItem("number", payload);
      // console.log(payload);
    },
    changeNumber2(state, payload) {
      if (payload != undefined) {
        state.number2 = payload + state.number;
        localStorage.setItem("number2", payload);
        // console.log("不等于undef", state.number2);
      } else {
        state.number2 = state.number;
        localStorage.setItem("number2", state.number);
        // console.log("111", state.number2);
      }

      // console.log(state.number2);
    },
    deptList(state, payload) {
      state.deptList = payload;
    },
    currentUserId(state, payload) {
      state.currentUserId = payload;
      // console.log(payload);
      // if (typeof payload === "string") {
      localStorage.setItem("currentUserId", payload); //领导评分，当前的用户id
      // } else {
      //   localStorage.setItem("currentUserId", JSON.stringify(payload)); //领导评分，当前的用户id
      // }
    },
    // currentDeptName(state, payload) {
    //   state.currentDeptName = payload;
    //   localStorage.setItem("currentDeptName", payload);
    // },
    currentUserIdList(state, payload) {
      state.currentUserIdList = payload;
      // console.log(payload);
      // if (typeof payload === "string") {
      //   localStorage.setItem("currentUserId", payload); //领导评分，当前的用户id
      // } else {
      localStorage.setItem("currentUserIdList", JSON.stringify(payload)); //领导评分，当前的用户id
      // }
    },
    currentDeptFlow(state, payload) {
      state.currentState = payload;
      localStorage.setItem("currentState", payload);
    },
    changeApprovalData(state, payload) {
      let index = state.approvalData.findIndex((item) => {
        // console.log(Object.keys(item));
        return Object.keys(item).toString() === Object.keys(payload).toString();
      });
      console.log(index, Object.keys(payload));
      if (index !== -1) {
        state.approvalData[index] = payload;
      } else {
        state.approvalData.push(payload);
      }
      console.log(state.approvalData);
    },
    clearApprovalData(state) {
      state.approvalData = [];
      state.userList = [];
      state.modelFinishState = [];
      state.modelFinishPerformance = [];
      console.log(state.approvalData);
    },
    currentName(state, payload) {
      state.currentName = payload;
      localStorage.setItem("currentName", payload);
    },
    //存储价值观选择的人
    userList(state, payload) {
      let index = state.userList.findIndex((item) => {
        // console.log(Object.keys(item));
        return Object.keys(item).toString() === Object.keys(payload).toString();
      });
      console.log(index, Object.keys(payload));
      if (index !== -1) {
        state.userList[index] = payload;
      } else {
        state.userList.push(payload);
      }
      console.log(state.userList);
    },
    // oneModelSelectUser(state, payload) {
    //   state.selectUser = payload;
    // },
    modelFinishState(state, payload) {
      let index = state.modelFinishState.findIndex((item) => {
        return Object.keys(item).toString() === Object.keys(payload).toString();
      });
      if (index != -1) {
        state.modelFinishState[index] = payload;
      } else {
        state.modelFinishState.push(payload);
      }
      console.log(payload);
    },
    modelFinishPerformance(state, payload) {
      let index = state.modelFinishPerformance.findIndex((item) => {
        return Object.keys(item).toString() === Object.keys(payload).toString();
      });
      if (index != -1) {
        state.modelFinishPerformance[index] = payload;
      } else {
        state.modelFinishPerformance.push(payload);
      }
      console.log(payload);
    },

    //存储临界月份
    saveCriticalMonth(state, payload) {
      state.criticalMonth = payload;
      localStorage.setItem("criticalMonth", payload);
    },
    saveYearOptions(state, payload) {
      state.yearOptions = payload;
      // console.log(payload);
      localStorage.setItem("yearOptions", JSON.stringify(payload));
    },
    saveDeptOptions(state, payload) {
      state.deptOptions = payload;
      localStorage.setItem("deptOptions", JSON.stringify(payload));
      // console.log("部门列表", state.deptOptions);
    },
    saveYear(state, payload) {
      state.year = payload;
      localStorage.setItem("year", payload);
    },
    //存储最新事件的月份
    saveMonth(state, payload) {
      // console.log(payload.month, payload.save);
      state.eventMonth = payload.month;
      state.eventSave = payload.save;
      localStorage.setItem("eventMonth", payload.month);
      localStorage.setItem("eventSave", payload.save);
    },
    changeLangType(state, payload) {
      state.langType = payload;
      localStorage.setItem("langType", payload);
      window.location.reload();
    },
  },
});
