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
        fullScreen: false,
        title: "Handleliste",
      },
    },
    {
      path: "/inventory",
      name: "inventory",
      component: () => import("@/views/InventoryView.vue"),
      meta: {
        requiresAuth: true,
        fullScreen: false,
        title: "Oversikt",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        fullScreen: true,
        title: "Freshify | Logg inn",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
      meta: {
        fullScreen: true,
        title: "Freshify | Registrering",
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
      meta: {
        fullScreen: false,
        title: "Rediger husholdning",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: {
        fullScreen: false,
        title: "Min profil",
      },
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("@/views/PrivacyView.vue"),
      meta: {
        requiresAuth: false,
        fullScreen: true,
        title: "Personvernerklæring",
      },
    },
    {
      path: "/tos",
      name: "tos",
      component: () => import("@/views/TosView.vue"),
      meta: {
        requiresAuth: false,
        fullScreen: true,
        title: "Vilkår og betingelser",
      },
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("@/views/StatisticsView.vue"),
      meta: {
        requiresAuth: true,
        fullScreen: false,
        title: "Statistikk",
      },
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("@/views/RecipesView.vue"),
      meta: {
        requiresAuth: true,
        fullScreen: false,
        title: "Oppskrifter",
      },
    },
    {
      path: "/publication",
      name: "publication",
      component: () => import("@/views/PublicationView.vue"),
    },
    {
      path: "/recipes/:id",
      name: "recipe-view",
      component: () => import("@/views/RecipeView.vue"),
      meta: {
        requiresAuth: true,
        fullScreen: false,
        title: "Kundeavis",
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const sessionStore = useSessionStore();
  const accountApi = new AccountApi();
  if (startup) {
    await accountApi
      .getLoggedInUser()
      .then((data) => {
        if (data.status == 200) {
          sessionStore.authenticate(data.data);
        }
      })
      .catch(() => {
        sessionStore.timeout();
      });
    startup = false;
  }

  const title: any = to.meta.title;
  if (title) {
    document.title = title;
  } else {
    document.title = "Freshify";
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
