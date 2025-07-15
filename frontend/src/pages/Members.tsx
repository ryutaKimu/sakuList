import { Title } from "../components/Title";
import { SelectBox } from "../components/SelectBox";
import { useEffect, useState } from "react";
import { fetchMembersGeneration, fetchMembersMbti } from "../api/members";
import Header from "../components/Header";
import { MembersList } from "../admin/components/MemberList";
import type { Filters, Member } from "../types/Member";


const Members = () => {
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



  return (
    <>
      <Header />
      <Title title="メンバーの一覧" />
      <MembersList members={members} filters={filters} onFilterChange={setFilters}/>
    </>
  );
};

export default Members;
