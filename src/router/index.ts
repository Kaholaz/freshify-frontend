import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
    {
      path: "/shopping-list",
      name: "shopping-list",
      component: () => import("../views/ShoppingListView.vue"),
    },
    {
      path: "/inventory",
      name: "inventory",
      component: () => import("@/views/InventoryView.vue"),
    },
  ],
});

export default router;
