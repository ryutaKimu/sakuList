// src/components/MemberCard.tsx

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type MemberCardProps = {
  name: string;
  furigana: string;
  imgUrl: string;
  graduated: boolean
};

export const MembersCard = ({
  name,
  furigana,
  imgUrl,
  graduated
}: MemberCardProps) => {
  return (
    <Card sx={{ width: 260, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="300"
        image={imgUrl}
        alt={`${name}の画像`}
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {furigana}
        </Typography>
        <Typography variant="caption" color={graduated ? "error" : "transparent"}>卒業済み</Typography>
      </CardContent>
    </Card>
  );
};
