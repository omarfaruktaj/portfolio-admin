import AuthLayout from "@/layout/auth-layout";
import RootLayout from "@/layout/root-layout";
import CreateProject from "@/pages/create-project";
import Home from "@/pages/home";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Projects from "@/pages/projects";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./private-route";

const router = createBrowserRouter([
  {
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/new",
        element: <CreateProject />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
