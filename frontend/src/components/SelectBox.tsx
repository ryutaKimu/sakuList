import { Box, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material"

type ChangeMember = {
  onChangeGeneration: (value: number) => void,
  onChangeMbti : (value: string) => void
}

export const SelectBox = ({onChangeGeneration, onChangeMbti}: ChangeMember) => {

  const handleGenerationChange = (event:SelectChangeEvent)=>{
    const selectedValue = Number(event.target.value)
    onChangeGeneration(selectedValue)
  }

  const handleMbtiChange = (event:SelectChangeEvent) =>{
    const selectedValue = String(event.target.value)
    onChangeMbti(selectedValue)
  }

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: 4, justifyContent: "center"}}>
      <FormControl sx={{width: "8%"}}>
        <InputLabel id="generation-label">期生</InputLabel>
        <Select
          labelId="generation-label"
          onChange={handleGenerationChange}
          label="期生"
        >
          <MenuItem value="0">すべて</MenuItem>
          <MenuItem value="2">2期生</MenuItem>
          <MenuItem value="3">3期生</MenuItem>
          <MenuItem value="4">4期生</MenuItem>
          <MenuItem value="100">卒業生</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{width: "8%"}}>
        <InputLabel id="mbti-label">MBTI</InputLabel>
        <Select
          labelId="mbti-label"
          onChange={handleMbtiChange}
          label="MBTI"
        >
          <MenuItem value="すべて">すべて</MenuItem>
          <MenuItem value="INFP">INFP（仲介者）</MenuItem>
          <MenuItem value="ESFP">ESFP（エンターテイナー）</MenuItem>
          <MenuItem value="INTP">INTP（論理学者）</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
