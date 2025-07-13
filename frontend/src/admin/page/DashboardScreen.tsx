import { Typography, Paper, Box, Grid } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MemberRegisterForm from "../components/RegisterMemberForm";

export default function DashboardScreen() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        管理ダッシュボード
      </Typography>

      <Grid container spacing={3} mb={4}>
        {/* カードなど */}
      </Grid>

      <MemberRegisterForm />
    </Box>
  );
}
