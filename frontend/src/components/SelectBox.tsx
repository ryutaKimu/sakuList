import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from "@mui/material"
import { useEffect, useState } from "react"
import { fetchAllGeneration, fetchAllMbti } from "../api/members"

type Filters = {
  generaId: number
  mbtiCode: string
}
type ChangeMember = {
  filters: Filters
  onChange: (filters: Filters) => void
}

export const SelectBox = ({ filters, onChange }: ChangeMember) => {
  const [generation, setGeneration] = useState<{ id: number, generation: string }[]>([])
  const [mbtis, setMbtis] = useState<{id: number, mbti_code: string,mbti_label: string }[]>([])

  const handleGenerationChange = (event: SelectChangeEvent) => {
    const selectedValue = Number(event.target.value);
    onChange({...filters, generaId: selectedValue});
  }

  const handleMbtiChange = (event: SelectChangeEvent) => {
    const selectedValue = String(event.target.value)
    onChange({...filters, mbtiCode: selectedValue})
  }

  useEffect(() => {
    fetchAllGeneration().then((response) => {
      setGeneration(response.data)
    })
  }, [])

  useEffect(()=>{
    fetchAllMbti().then((response)=>{
      setMbtis(response.data);
    })
  }, [])

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: 4, justifyContent: "center" }}>
      <FormControl sx={{ width: "8%" }}>
        <InputLabel id="generation-label">期生</InputLabel>
        <Select
          labelId="generation-label"
          onChange={handleGenerationChange}
          label="期生"
          value={`${filters.generaId}`}
        >
          <MenuItem value={0}>すべて</MenuItem>
          {generation.map((gen) => (
            <MenuItem key={gen.id} value={gen.id}>
              {gen.generation}期生
            </MenuItem>
          ))}
          <MenuItem value={100}>卒業生</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: "8%" }}>
        <InputLabel id="mbti-label">MBTI</InputLabel>
        <Select
          labelId="mbti-label"
          onChange={handleMbtiChange}
          label="MBTI"
          value = {`${filters.mbtiCode}`}
          sx={{ width: 200, height: 50 }} 
        >
          <MenuItem value="すべて">すべて</MenuItem>
          {mbtis.map((mbti)=>(
            <MenuItem key={mbti.id} value={mbti.mbti_code}>
              {`${mbti.mbti_code}${mbti.mbti_label}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
