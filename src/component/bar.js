import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#131313',
    }
   
  },
});

export default function ButtonAppBar() {
  return (
    <ThemeProvider theme={theme}> 
        <Box sx={{ flexGrow: 1 }} m={2} >
        <AppBar position="absolute">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shopify Code Challenge - Shengwei Peng
            </Typography>

            <Button 
              variant="outlined" 
              color="inherit"
              href="https://github.com/ptrpengdev/shopify-frontend-code-challenge"
              >
                Source Code
            </Button>
            </Toolbar>
        </AppBar>
        </Box>
    </ThemeProvider>
  );
}