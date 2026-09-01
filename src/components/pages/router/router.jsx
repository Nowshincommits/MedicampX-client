import { createBrowserRouter } from "react-router";
import RootLayout from "../../Layouts/RootLayout";
import Home from "../../Home/Home";
import Register from "../Auth/Register/Register";
import SignIn from "../Auth/SignIn/SignIn";
import DashboardLayout from "../../Layouts/DashboardLayout";
import PrivateRoutes from "../../../routes/PrivateRoutes";
import Forbidden from "../Forbidden/Forbidden";
import AddACamp from "@/components/pages/AddACamp/AddACamp";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/available-camps",
        // Component: AvailableCamps
      },
      {
        path: "/about-us",
        // Component: AboutUs
      },
      {
        path: "/login",
        Component: SignIn,
      },
      {
        path: "/signup",
        Component: Register,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <DashboardLayout />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/add-a-camp",
        element: (
          <PrivateRoutes>
            <AddACamp />
          </PrivateRoutes>
        ),
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
    ],
  },
]);
