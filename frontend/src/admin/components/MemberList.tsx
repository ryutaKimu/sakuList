import { Grid } from "@mui/material";
import { SelectBox } from "../../components/SelectBox";
import { MembersCard } from "../../components/MembersCard";
import { Link } from "react-router-dom";

type Member = {
  id: number;
  name: string;
  furigana: string;
  generation: number
  img_url: string;
  graduated: boolean;
}

type Filters = {
  generaId: number;
  mbtiCode: string;
}

type MembersListProps = {
  members: Member[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export const MembersList = ({ members, filters, onFilterChange }: MembersListProps) => {
  return (
    <>
      <SelectBox filters={filters} onChange={onFilterChange} />
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 8 }}>
        {members.map((member: Member, index) => (
          <Grid key={index}>
              <Link
                to={`member/detail/${member.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
              <MembersCard
                name={member.name}
                furigana={member.furigana}
                imgUrl={member.img_url}
                graduated={member.graduated}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
