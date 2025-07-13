import { adminApi } from "./index";

export const postMember = async (formData: FormData) => {
  const response = await adminApi.post("admin/dashboard", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
