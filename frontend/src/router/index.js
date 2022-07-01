import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Translate from "@/views/Translate.vue";
import Review from "@/views/Review.vue";
import Alignment from "@/views/Alignment.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
// lazy-loaded
const Translation = () => import("@/views/Translation.vue")
const Profile = () => import("@/components/Profile.vue")
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/data",
    component: Home,
  },
  {
    path: "/translate",
    component: Translate,
  },
  {
    path: "/review",
    component: Review,
  },
  {
    path: "/alignment",
    component: Alignment,
  },
  {
    path: "/translate/:idSentence/:idLanguageTo",
    name: "translation",
    component: Translation,
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
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
export default router