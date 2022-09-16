import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Translate from "@/views/Translate.vue";
import Review from "@/views/Review.vue";
import Alignment from "@/views/Alignment.vue";
import AdminDataset from "@/views/AdminDataset.vue";
import AdminParallelText from "@/views/AdminParallelText.vue";
import DataScientistBoard from "@/views/DataScientistBoard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
// lazy-loaded
const Translation = () => import("@/views/Translation.vue")
const AlignmentText = () => import("@/views/AlignmentText.vue")
const Profile = () => import("@/views/Profile.vue")
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/data",
    component: DataScientistBoard,
    meta: {requiresDataScientist: true}
  },
  {
    path: "/dataset",
    component: AdminDataset,
    meta: {requiresAdmin: true}
  },
  {
    path: "/paralleltext",
    component: AdminParallelText,
    meta: {requiresAdmin: true}
  },
  {
    path: "/translate",
    component: Translate,
    meta: {requiresTranslator: true}
  },
  {
    path: "/review",
    component: Review,
    meta: {requiresTranslator: true}
  },
  {
    path: "/alignment",
    component: Alignment,
    meta: {requiresTranslator: true}
  },
  {
    path: "/translate/:idSentence/:idLanguageTo",
    name: "translation",
    component: Translation,
    meta: {requiresTranslator: true}
  },
  {
    path: "/alignment/:idParallelText",
    name: "alignmentText",
    component: AlignmentText,
    meta: {requiresTranslator: true}
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresTranslator)) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user.roles.role_translator) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresDataScientist)) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user.roles.role_data_scientist) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user.roles.role_admin) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router