import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeClean.vue";
import AIBuilder from "../views/AIBuilder.vue";
import Bantuan from "../views/Bantuan.vue";
import Tentang from "../views/Tentang.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/ai-builder",
      name: "AIBuilder",
      component: AIBuilder,
    },
    {
      path: "/bantuan",
      name: "Bantuan",
      component: Bantuan,
    },
    {
      path: "/tentang",
      name: "Tentang",
      component: Tentang,
    },
  ],
});

export default router;
