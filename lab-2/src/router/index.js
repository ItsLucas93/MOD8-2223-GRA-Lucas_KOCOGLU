import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
// import Contact from "@/views/ContactView.vue";
import HomePage from "../pages/HomePage.vue";
import AddBookPage from "../pages/AddBookPage.vue";
import BookPage from "../pages/BookPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/books/add",
      name: "add-book",
      component: AddBookPage,
    },
    {
      path: "/books/:id",
      name: "book",
      component: BookPage,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../components/AdminPage.vue"),
    },

    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue')
    // },
    // {
    //     path: '/contact',
    //     name: 'contact',
    //     component: () => import('../views/ContactView.vue')
    // }
  ],
});

export default router;
