import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMember } from "../api/members";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  CircularProgress,
} from "@mui/material";
import Header from "../components/Header";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

const MemberDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetchMember(id).then((res) => setUser(res.data));
  }, [id]);

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="flex-start"
        gap={6}
        p={4}
        sx={{
          background: "linear-gradient(to right, #fff0f5, #ffffff)",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {/* メンバー画像 */}
        <Avatar
          src={user.img_url}
          alt={user.name}
          variant="square"
          sx={{
            width: { xs: 300, md: 400 },
            height: { xs: 450, md: 600 },
            borderRadius: 2,
            boxShadow: 4,
          }}
        />

        {/* メンバー情報 */}
        <Box display="flex" flexDirection="column" gap={3} flex={1} width="100%">
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box flex="1 1 45%">
              <Typography variant="subtitle2" color="text.secondary">
                名前
              </Typography>
              <Typography variant="h4">{user.name}</Typography>
            </Box>
            <Box flex="1 1 45%">
              <Typography variant="subtitle2" color="text.secondary">
                期生
              </Typography>
              <Typography variant="h4">{user.generation}期生</Typography>
            </Box>
            <Box flex="1 1 45%">
              <Typography variant="subtitle2" color="text.secondary">
                ふりがな
              </Typography>
              <Typography variant="h4">{user.furigana}</Typography>
            </Box>
            <Box flex="1 1 45%">
              <Typography variant="subtitle2" color="text.secondary">
                生年月日
              </Typography>
              <Typography variant="h4">{formatDate(user.birthday)}</Typography>
            </Box>
            <Box flex="1 1 45%">
              <Typography variant="subtitle2" color="text.secondary">
                出身
              </Typography>
              <Typography variant="h4">{user.prefecture}</Typography>
            </Box>
            <Box flex="1 1 45%">
              <Typography variant="subtitle2" color="text.secondary">
                MBTI
              </Typography>
              <Typography variant="h4">
                {user.mbti_code}
                {user.mbti_label}
              </Typography>
            </Box>
          </Box>

          {/* 自己紹介欄 */}
          <Paper
            elevation={4}
            sx={{
              background: "linear-gradient(to bottom, #fff0f6, #ffffff)",
              padding: 3,
              borderRadius: 3,
              mt: 4,
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
              maxWidth: "100%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, color: "#880e4f" }}
            >
              紹介
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.introduce}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default MemberDetailScreen;
