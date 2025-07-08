import { Typography } from "@mui/material";

type title = {
  title: string
}

export const Title = ( { title }: title)=>{
  return(
  <>
    <Typography  
      variant="h3"
      component="h2"
      sx={{
        justifyContent: "center",
        mt: 6,
        mb: 2,
        fontWeight: 'bold',
        color: '#d63384',
        display: 'flex',
        px: 2,
      }}>
        {title}
    </Typography>
  </>
  )
}