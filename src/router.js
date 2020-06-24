import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/tutorial/add",
      name: "tutorial-add",
      component: () => import("./components/AddTutorial")
    },
    {
      path:"/tree",
      name: "tree",
      component: () => import("./components/Tree")
    },
    {
      path: "/products",
      name: "products",
      component: () => import("./components/ProductsList")
    },
    {
      path: "/product/add",
      name: "product-add",
      component: () => import("./components/AddProduct")
    },
    {
      path: "/product/:id",
      name: "product-details",
      component: () => import("./components/Product")
    }
  ]
});
