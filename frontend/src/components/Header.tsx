// src/components/Header.tsx
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: "#f8e0e7", 
      color: "#333",   
      marginBottom: 2,
      paddingTop: 2,
      paddingBottom: 3,  
      }}>
      <Toolbar sx ={{ textAlign: "center"}}>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1}}>
          🌸 SakuList
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
