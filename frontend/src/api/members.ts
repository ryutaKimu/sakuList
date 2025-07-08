import { apiClient } from "."

export const fetchMembersGeneration = (id:number)=>{
  return apiClient.get(`/members/generation/${id}`)
}

export const fetchMembersMbti = (mbti: string) => {
  return apiClient.get(`/members/mbti/${mbti}`)
}