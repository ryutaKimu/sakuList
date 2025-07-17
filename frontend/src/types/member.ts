export type Member = {
  id: number;
  name: string;
  furigana: string;
  generation: number;
  img_url: string;
  graduated: boolean;
};

export type Filters = {
  generaId: number;
  mbtiCode: string;
};

export type UpdateMember = {
    id: number | undefined;
    name: string;
    furigana: string;
    birthday: string | undefined;
    prefecture: string;
    img_url: string | undefined;
    introduce: string;
    graduated: boolean;
    generation_id: string | null;
    mbti_id: number | null;
};
