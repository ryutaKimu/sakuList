import { Typography, Box,  } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Filters, Member } from "../../types/Member";
import { fetchMembersGeneration, fetchMembersMbti } from "../../api/members";
import { MembersList } from "../components/MemberList";

export default function DashboardScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filters, setFilters] = useState<Filters>({
    generaId: 0,
    mbtiCode: "すべて",
  });

  useEffect(()=>{
    fetchMembersGeneration(filters.generaId).then(response => setMembers(response.data))
    .catch(error => console.log(error) )
  }, [filters.generaId])

  useEffect(()=>{
    if(filters.mbtiCode === "") return;
    fetchMembersMbti(filters.mbtiCode).then(response => setMembers(response.data))
    .catch(error => console.log(error) )
  }, [filters.mbtiCode])


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
      <MembersList members={members} filters={filters} onFilterChange={setFilters}/>
    </Box>
  );
}
