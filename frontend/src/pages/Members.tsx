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
  const [filters, setFilters] = useState({
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



  return (
    <>
      <Title title="メンバーの一覧" />
      <SelectBox  filters={filters} onChange={setFilters}/>
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
