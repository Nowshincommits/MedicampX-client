import { createBrowserRouter } from "react-router";
import RootLayout from "../../Layouts/RootLayout";
import Home from "../../Home/Home";
import Register from "../Auth/Register/Register";
import SignIn from "../Auth/SignIn/SignIn";
import DashboardLayout from "../../Layouts/DashboardLayout";
import PrivateRoutes from "../../../routes/PrivateRoutes";
import Forbidden from "../Forbidden/Forbidden";
import AddACamp from "@/components/pages/AddACamp/AddACamp";
import AvailableCamps from "../../AvailableCamps/AvailableCamps";
import Payment from "../../Payment/Payment";
import RegisteredCamps from "../../../components/pages/RegisteredCamps/RegisteredCamps";
import ParticipantProfile from "../ParticipantProfile/ParticipantProfile";
import PaymentHistory from "../PaymentHistory/PaymentHistory";
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
        Component: AvailableCamps
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
        )
      },
      {
        path: "/dashboard/registered-camps", 
        element: (
          <PrivateRoutes>
            <RegisteredCamps />
          </PrivateRoutes>
        )
      },
      {
      path: "/dashboard/participant-profile",
      element: (
        <PrivateRoutes>
          <ParticipantProfile />
        </PrivateRoutes>
      )    
      },
      {
       path: "/dashboard/payment-history",
       element: (
        <PrivateRoutes>
          <PaymentHistory />
        </PrivateRoutes>
       )
      },
      {
      },
      {
       path: "/payment/:id",
       Component: Payment
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
    ],
  },
]);
