import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Group from '../../Pages/group';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from '../../Pages/addUser';
const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const names = Group();
  console.log(names,"this is the names called")

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Divider />
        <List>
  {/* Map over the names and render each as a ListItem */}
  {names.map((name, index) => (
    <ListItem key={index} disablePadding>
      <ListItemButton component={Link} to={`/${name.toLowerCase()}`}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

      </Drawer>
      <div style={{ marginLeft: `${drawerWidth}px` }}>
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      bgcolor: 'background.default',
      p: 3,
      marginLeft: `${drawerWidth}px`, // Set marginLeft to match the width of the drawer
    }}
  >
    {/* <AddUser/> */}
    <Routes>
    <Route path ='/:name' element={<AddUser/>}/>
    </Routes>
  </Box>
</div>

        </Box>
    
  );
}

