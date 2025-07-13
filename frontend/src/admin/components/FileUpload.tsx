
import React from "react";
import { Button } from "@mui/material";

type FileUploadProps = {
  onFileSelect: (file: File) => void;
};

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <Button variant="outlined" component="label" sx={{ my: 2 }}>
      画像を選択
      <input type="file" accept="image/*" hidden onChange={handleFileChange} />
    </Button>
  );
}