import { apiClient } from "."

export const fetchMembersGeneration = (id:number)=>{
  return apiClient.get(`/members/generation/${id}`)
}

export const fetchMembersMbti = (mbti: string) => {
  return apiClient.get(`/members/mbti/${mbti}`)
}

export const fetchAllGeneration = ()=>{
  return apiClient.get(`/generation`)
}

export const fetchAllMbti = ()=>{
  return apiClient.get('/mbti')
}