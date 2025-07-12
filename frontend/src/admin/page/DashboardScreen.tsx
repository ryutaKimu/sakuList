import { Typography, Paper, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DashboardScreen() {
  const isLoggedIn = useAuthStore((state)=> state.isLoggedIn);
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        管理ダッシュボード
      </Typography>

      <Grid container spacing={3}>
        {/* カード1 */}
        <Grid >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">会員数</Typography>
            <Typography variant="h4">1,234人</Typography>
          </Paper>
        </Grid>

        {/* カード2 */}
        <Grid>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">本日ログイン数</Typography>
            <Typography variant="h4">87人</Typography>
          </Paper>
        </Grid>

        {/* 他の情報カードを追加できます */}
      </Grid>
    </Box>
  );
}
