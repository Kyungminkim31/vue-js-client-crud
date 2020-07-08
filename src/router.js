import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: 'home',
      component: () => import("./views/Home.vue")
    },
    {
      path: "/login",
      name: 'login',
      component: () => import("./views/Login.vue")
    },
    {
      path: "/register",
      name: 'register',
      component: () => import("./views/Register.vue")
    },
    {
      path: "/profile",
      name: 'profile',
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/tutorials",
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
