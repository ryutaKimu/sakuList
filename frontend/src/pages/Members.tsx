import Grid from "@mui/material/Grid";
import { Title } from "../components/Title";
import { MembersCard } from "../components/MembersCard";
import { SelectBox } from "../components/SelectBox";
import { useEffect, useState } from "react";
import { fetchMembersGeneration, fetchMembersMbti } from "../api/members";

type Members = {
  id: number,
  name: string,
  furigana: string,
  img_url: string,
  graduated: boolean
}

const Members = () => {
  const [members, setMembers] = useState<Members[]>([]);
  const [menuValue, setMenuValue] = useState(0)
  const [mbtiValue, setMbtiValue] = useState("");

  useEffect(()=>{
    fetchMembersGeneration(menuValue).then(response => setMembers(response.data))
    .catch(error => console.log(error) )
  }, [menuValue])

  useEffect(()=>{
    fetchMembersMbti(mbtiValue).then(response => setMembers(response.data))
    .catch(error => console.log(error) )
  }, [mbtiValue])



  return (
    <>
      <Title title="メンバーの一覧" />
      <SelectBox onChangeGeneration = {setMenuValue} onChangeMbti = {setMbtiValue}/>
      <Grid container spacing={2} justifyContent="center" sx={{marginTop:8}}>
        {members.map((member, index) => (
          <Grid key={index}>
            <MembersCard
              name={member.name}
              furigana={member.furigana}
              imgUrl={member.img_url}
              graduated={member.graduated}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Members;
