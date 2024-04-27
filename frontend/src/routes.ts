import { lazy } from "solid-js";

const routes = [
    {
      path: "/",
      component: lazy(() => import("./components/pages/home")),
    },
    {
      path: "/villages",
      component: lazy(() => import("./components/pages/villages")),
    },
    {
      path: "/ninjas",
      component: lazy(() => import("./components/pages/ninjas"))
    },
    {
      path: "/*404",
      component: lazy(() => import("./components/pages/404")),
    },
  ];

export default routes