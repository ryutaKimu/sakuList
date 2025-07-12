import { AppBar, Box, Toolbar, Typography, Container } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {

  // レイアウト表示のみのurlにアクセスさせない
  const location = useLocation();
  const adminRoot = location.pathname === "/admin/"
  if(adminRoot){
    return <Navigate to= "/admin/login" replace/>
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 上部ナビゲーションバー */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            管理画面
          </Typography>
        </Toolbar>
      </AppBar>

      {/* コンテンツエリア */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>

      {/* フッター（必要なら） */}
      <Box component="footer" sx={{ py: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 管理システム
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminLayout;
