import { createBrowserRouter,} from "react-router-dom";
import Members from "../pages/Members";
import LoginScreen from "../admin/page/LoginScreen";
import AdminLayout from "../admin/components/AdminLayout";
import DashboardScreen from "../admin/page/DashboardScreen";
import MemberDetail from "../admin/page/MemberDetail";
import MemberDetailScreen from "../pages/MemberDetailScreem";


const router = createBrowserRouter([
  {
    path: "/", 
    Component: Members,   
  },

  {
    path: "member/detail/:id",
    Component : MemberDetailScreen
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
        Component: DashboardScreen,
      },
      {
        path: "dashboard/member/detail/:id",
        Component: MemberDetail
      }
    ]
  },
]);

export default router;
