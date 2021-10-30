import LoginService from "@/services/LoginService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: {
    initialState,
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.initialState.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.initialState.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.initialState.loggedIn = false;
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      return LoginService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      LoginService.logout();
      commit("logout");
    },
  },
  modules: {},
};
