import { createBrowserRouter } from "react-router";
import RootLayout from "../../Layouts/RootLayout";
import Home from "../../Home/Home";
import Register from "../Auth/Register/Register";
import SignIn from "../Auth/SignIn/SignIn";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Forbidden from "../Forbidden/Forbidden";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
            index: true,
            Component: Home
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
                Component: SignIn
            },
            {
                path: "/signup",
                Component: Register
            },
            {
                path: "/dashboard",
                Component: DashboardLayout,
            },
            {
                path: "/forbidden",
                Component: Forbidden
            }
        ]
    }
]);