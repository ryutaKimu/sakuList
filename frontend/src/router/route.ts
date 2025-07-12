import { createBrowserRouter,} from "react-router-dom";
import Members from "../pages/Members";
import LoginScreen from "../admin/page/LoginScreen";
import AdminLayout from "../admin/components/AdminLayout";
import DashboardScreen from "../admin/page/DashboardScreen";


const router = createBrowserRouter([
  {
    path: "/", 
    Component: Members,   
  },
  {
    path: "admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        path: "login",
        Component: LoginScreen
      },
      {
        path: "dashboard",
        Component: DashboardScreen
      }
    ]
  },
]);

export default router;
