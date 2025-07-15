import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMember } from "../api/admin";
import { Avatar, Box, Typography } from "@mui/material";

const MemberDetail = ()=>{

  type Member = {
    id: number
    name: string
    furigana: string
    birthday: string
    prefecture: string
    img_url: string
    mbti_code:string
    mbti_label: string
    generation: number
  }

  const {id} = useParams<{id: string}>();
  const [user, setUser] = useState<Member | null>(null)
  useEffect(()=>{
    fetchMember(id).then(res => setUser(res))
  },[])

  const formattedBirthday = useMemo(() => {
    if (!user) return "";
    const date = new Date(user.birthday);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }, [user]);

  return (
    <>
    <Box display="flex" gap={4} alignItems="flex-start">
  <Avatar 
    src={user?.img_url}   
    sx={{ width: 400, height: 600 }}
    variant="square"
  />
  <Box display="flex" flexDirection="column" justifyContent="center" gap={8}>
    <Typography variant="h4" gutterBottom>名前:　{user?.name}</Typography>
    <Typography variant="h4">ふりがな:　{user?.furigana}</Typography>
    <Typography variant="h4">生年月日:　{formattedBirthday}</Typography>
    <Typography variant="h4">出身地:　{user?.prefecture}</Typography>
    <Typography variant="h4">期生: 　{user?.generation}期生</Typography>
    <Typography variant="h4">MBTI: 　{user?.mbti_code} {user?.mbti_label}</Typography>
  </Box>
</Box>
    </>
  )
}

export default MemberDetail;