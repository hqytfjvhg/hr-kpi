import { createStore } from "vuex";

export const phoneStore = createStore({
  state: {
    valueList: localStorage.getItem("valueList") ? localStorage.getItem("valueList") : [],
    valuesStatus: localStorage.getItem("valuesStatus") ? JSON.parse(localStorage.getItem("valuesStatus")) : [],
  },
  mutations: {
    addValue(state, value) {
      state.valueList = value;
      localStorage.setItem("valueList", JSON.stringify(state.valueList));
    },
    addStatus(state, status) {
      state.valuesStatus = status;
      localStorage.setItem("valuesStatus", JSON.stringify(state.valuesStatus));
    },
  },
});
