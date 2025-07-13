import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { fetchAllGeneration, fetchAllMbti } from "../../api/members";
import { FileUpload } from "./FileUpload"; // ファイル選択コンポーネント
import axios from "axios";
import { postMember } from "../api/admin";

export default function MemberRegisterForm() {
  const [generations, setGenerations] = useState<{ id: number; generation: number }[]>([]);
  const [mbtis, setMbtis] = useState<{ id: number; mbti_code: string; mbti_label: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    furigana: "",
    birthday: "",
    generation_id: 0,
    prefecture: "",
    mbti_id: 0,
    graduated: false,
    introduce: "",
  });


  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAllGeneration().then((response) => {
      setGenerations(response.data);
    });
    fetchAllMbti().then((response) => {
      setMbtis(response.data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      const value =
        target.name === "generation_id" || target.name === "mbti_id"
          ? Number(target.value)
          : target.value;

      setFormData((prev) => ({
        ...prev,
        [target.name]: value,
      }));
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("画像を選択してください");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    data.append("image", selectedFile);

    try {
      await axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true });
      await postMember(data);

      alert("登録成功！");
      setFormData({
        name: "",
        furigana: "",
        birthday: "",
        generation_id: 0,
        prefecture: "",
        mbti_id: 0,
        graduated: false,
        introduce: "",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      alert("登録失敗。内容を確認してください。");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={3}>
        メンバー登録フォーム
      </Typography>

      <TextField label="名前" name="name" value={formData.name} onChange={handleChange} fullWidth required margin="normal" />
      <TextField label="ふりがな" name="furigana" value={formData.furigana} onChange={handleChange} fullWidth required margin="normal" />
      <TextField
        label="生年月日"
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField select label="期生" name="generation_id" value={formData.generation_id} onChange={handleChange} fullWidth required margin="normal">
        <MenuItem value={0} disabled>
          選択してください
        </MenuItem>
        {generations.map((gen) => (
          <MenuItem key={gen.id} value={gen.id}>
            {gen.generation}期生
          </MenuItem>
        ))}
      </TextField>

      <TextField label="都道府県" name="prefecture" value={formData.prefecture} onChange={handleChange} fullWidth required margin="normal" />

      <Box mt={2}>
        <FileUpload onFileSelect={handleFileSelect} />
      </Box>

      {previewUrl && (
        <Box mt={2}>
          <Typography variant="subtitle1">画像プレビュー:</Typography>
          <img src={previewUrl} alt="プレビュー" style={{ maxWidth: "100%", height: "auto" }} />
        </Box>
      )}

      <TextField select label="MBTI" name="mbti_id" value={formData.mbti_id} onChange={handleChange} fullWidth margin="normal">
        <MenuItem value={0} disabled>
          選択してください
        </MenuItem>
        {mbtis.map((mbti) => (
          <MenuItem key={mbti.id} value={mbti.id}>
            {`${mbti.mbti_code}${mbti.mbti_label}`}
          </MenuItem>
        ))}
      </TextField>
      <TextField label="紹介文" name="introduce" value={formData.introduce} onChange={handleChange} fullWidth margin="normal" multiline minRows={4} />
      <FormControlLabel control={<Checkbox name="graduated" checked={formData.graduated} onChange={handleChange} />} label="卒業済み" />
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          登録
        </Button>
      </Box>
    </Box>
  );
}
