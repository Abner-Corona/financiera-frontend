import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });
import axios from "axios";

const base =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/api/";
axios.defaults.baseURL = base;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userActual:null
  },
  mutations: {
     setUserActual(state,user){
      state.userActual=user
    }
  },
  actions: {
    async ApiGet(context, { url }) {
      const response = await axios.get(url, {
        headers: {
          "Content-type": "",
          "cache-control": "no-cache",
          Authorization: "Bearer " + context.state.token,
        },
      });
      return response.data;
    },
    async ApiPost(context, { url, item }) {
      const response = await axios.post(url, item, {
        headers: {
          "Content-type": "application/json",
          "cache-control": "no-cache",
          Authorization: "Bearer " + context.state.token,
        },
      });
      return response.data;
    },
    async ApiPut(context, { url, item }) {
      const response = await axios.put(url, item, {
        headers: {
          "Content-type": "application/json",
          "cache-control": "no-cache",
          Authorization: "Bearer " + context.state.token,
        },
      });
      return response.data;
    },
    async ApiDelete(context, { url, item }) {
      const response = await axios.delete(
        url,
        {
          data: item,
        },
        {
          headers: {
            "Content-type": "application/json",
            "cache-control": "no-cache",
            Authorization: "Bearer " + context.state.token,
          },
        }
      );
      return response.data;
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
