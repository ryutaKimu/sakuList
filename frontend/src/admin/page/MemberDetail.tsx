import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  type SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  Button
} from "@mui/material";
import { fetchMember, updateMember } from "../api/admin";
import { fetchAllGeneration, fetchAllMbti } from "../../api/members";

const MemberDetail = () => {
  type Member = {
    id: number;
    name: string;
    furigana: string;
    birthday: string;
    prefecture: string;
    img_url: string;
    mbti_code: string;
    mbti_label: string;
    generation: string;
    graduated: boolean;
    introduce: string;
  };

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Member | null>(null);

  const [generations, setGenerations] = useState<
    { id: number; generation: string }[]
  >([]);
  const [mbtis, setMbtis] = useState<
    { id: number; mbti_code: string; mbti_label: string }[]
  >([]);

  const [formValues, setFormValues] = useState<{
    name: string;
    furigana: string;
    generation: string | "";
    mbti_code: string;
    prefecture: string;
    introduce: string;
    graduated: boolean
  }>({
    name: "",
    furigana: "",
    generation: "",
    mbti_code: "",
    prefecture: "",
    introduce: "",
    graduated: false
  });

  // APIからuser取得
  useEffect(() => {
    fetchMember(id).then((res) => setUser(res));
  }, [id]);

  // APIから世代一覧取得
  useEffect(() => {
    fetchAllGeneration().then((res) => setGenerations(res.data));
  }, []);

  // APIからMBTI一覧取得
  useEffect(() => {
    fetchAllMbti().then((res) => setMbtis(res.data));
  }, []);

  // userが更新されたらformValuesにセット
  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name ?? "",
        furigana: user.furigana ?? "",
        generation: String(user.generation ?? ""),
        mbti_code: user.mbti_code ?? "",
        prefecture: user.prefecture ?? "",
        introduce: user.introduce ?? "",
        graduated: user.graduated ?? false
      });
    }
  }, [user]);

  // TextField用 onChangeハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select用 onChangeハンドラ
  const handleSelectChange = (e: SelectChangeEvent ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "generation" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleSubmit = async () =>{
    const selectedMbti = mbtis.find(
      (mbti) => mbti.mbti_code === formValues.mbti_code
    );

    const payload = {
      id: user?.id,
      name: formValues.name,
      furigana: formValues.furigana,
      birthday: user?.birthday,
      prefecture: formValues.prefecture,
      img_url: user?.img_url,
      introduce: formValues.introduce,
      graduated: formValues.graduated,
      generation_id: formValues.generation ?? null,
      mbti_id: selectedMbti?.id ?? null,
    };

    try {
      if(!id) return null;
      await updateMember(id, payload);
      alert("更新しました");
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  }

  const formattedBirthday = useMemo(() => {
    if (!user) return "";
    const date = new Date(user.birthday);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }, [user]);

  return (
    <Box display="flex" gap={4} alignItems="flex-start" p={2}>
      <Avatar
        src={user?.img_url}
        sx={{ width: 400, height: 600 }}
        variant="square"
      />
      <Stack spacing={3} flex={1}>
        <TextField
          label="氏名"
          name="name"
          required
          value={formValues.name}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="ふりがな"
          name="furigana"
          required
          value={formValues.furigana}
          onChange={handleInputChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="generation-label">期生</InputLabel>
          <Select
            labelId="generation-label"
            label="期生"
            name="generation"
            value={formValues.generation}
            onChange={handleSelectChange}
          >
            {generations.map((gen) => (
              <MenuItem key={gen.id} value={gen.id}>
                {gen.generation}期生
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="生年月日" value={formattedBirthday} fullWidth />

        <TextField
          label="出身地"
          name="prefecture"
          value={formValues.prefecture}
          onChange={handleInputChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="mbti-label">MBTI</InputLabel>
          <Select
            labelId="mbti-label"
            label="MBTI"
            name="mbti_code"
            value={formValues.mbti_code}
            onChange={handleSelectChange}
          >

            {mbtis.map((mbti) => (
              <MenuItem key={mbti.id} value={mbti.mbti_code}>
                {mbti.mbti_code}
                {mbti.mbti_label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="自己紹介"
          name="introduce"
          value={formValues.introduce}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
        />

        <FormControlLabel
          control={
          <Checkbox
            checked={formValues.graduated}
            onChange={handleCheckboxChange}
            name="graduated"
            color="error"
          />
          }
          label="卒業済み"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
            更新する
        </Button>
      </Stack>
    </Box>
  );
};

export default MemberDetail;
