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
