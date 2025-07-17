import type { UpdateMember } from "../../types/Member";
import { adminApi } from "./index";

export const postMember = async (formData: FormData) => {
  const response = await adminApi.post("admin/dashboard", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
<<<<<<< Updated upstream
=======

export const fetchMember = async(id?:string)=>{
  const response = await adminApi.get(`admin/member/detail/${id}`)
  return response.data
}

export const updateMember = async(id:string, payload: UpdateMember)=>{
  const response = await adminApi.put(`admin/dashboard/member/${id}`, payload)
  return response.data
}
>>>>>>> Stashed changes
