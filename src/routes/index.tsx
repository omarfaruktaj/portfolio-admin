import AuthLayout from "@/layout/auth-layout";
import RootLayout from "@/layout/root-layout";
import Blog from "@/pages/blog";
import CreateBlogPost from "@/pages/create-blog";
import CreateExperience from "@/pages/create-experience";
import CreateProject from "@/pages/create-project";
import CreateSkill from "@/pages/create-skill";
import Experiences from "@/pages/experiences";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Projects from "@/pages/projects";
import Skills from "@/pages/skills";
import { createBrowserRouter, Navigate } from "react-router";
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
        element: <Navigate to="/projects" />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/new",
        element: <CreateProject />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/blogs/new",
        element: <CreateBlogPost />,
      },
      {
        path: "/skills",
        element: <Skills />,
      },
      {
        path: "/skills/new",
        element: <CreateSkill />,
      },
      {
        path: "/experiences",
        element: <Experiences />,
      },
      {
        path: "/experiences/new",
        element: <CreateExperience />,
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
