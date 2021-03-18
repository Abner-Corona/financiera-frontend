import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () =>
      import(/* webpackChunkName: "Main" */ "../layouts/Main.vue"),
    children: [
      {
        path: "/Accounts",
        name: "Accounts",
        component: () =>
          import(/* webpackChunkName: "Accounts" */ "../views/Main/Accounts.vue"),
      },
      {
        path: "/Records",
        name: "Records",
        component: () =>
          import(/* webpackChunkName: "Records" */ "../views/Main/Records.vue"),
      },
    ],
  },
  {
    path: "/NoUsers",
    name: "NoUsers",
    component: () =>
      import(/* webpackChunkName: "NoUsers" */ "../layouts/NoUsers.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
