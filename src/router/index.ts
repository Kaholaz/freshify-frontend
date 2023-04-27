import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { useSessionStore } from "@/stores/session";
import { AccountApi } from "@/services/index";

let startup = true;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: false,
        fullScreen: true,
      },
    },
    {
      path: "/shopping-list",
      name: "shopping-list",
      component: () => import("@/views/ShoppingListView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/inventory",
      name: "inventory",
      component: () => import("@/views/InventoryView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        fullScreen: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
      meta: {
        fullScreen: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
      meta: {
        fullScreen: true,
      },
    },
    {
      path: "/edit-household",
      name: "edit household",
      component: () => import("@/views/HouseholdView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore();
  const accountApi = new AccountApi();
  if (startup) {
    accountApi
      .getLoggedInUser()
      .then((data) => {
        if (data.status == 200) {
          sessionStore.authenticate(data.data);
          console.log(sessionStore.isAuthenticated);
        }
      })
      .catch(() => {
        sessionStore.timeout();
      });
    startup = false;
  }

  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next({ name: "login" });
  } else if (to.meta.requiresAuth == false && sessionStore.isAuthenticated) {
    next({ name: "inventory" });
  } else {
    next();
  }
});

export default router;
