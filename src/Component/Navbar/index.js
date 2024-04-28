import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from '../../Pages/addUser';
import Group from '../../Pages/group'; // Import Group componentx
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import HttpService from '../../httpservice';
import io from 'socket.io-client';
import { useSelector } from "react-redux";


const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const { userDetails } = useSelector((state) => state.user);

  // State to hold group names
  const [user, setNames] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  // State to manage dialog open state
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogForemail, setOpenDialogForEmail] = useState(false);
  const [selectedGroupName,setSelectedGroupName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);


  console.log(userDetails)

  // State to hold form data for creating a group
  const [formData, setFormData] = useState({
    groupName: '',
    groupImage: null,
    users: [],
  });

  const socket = io('http://localhost:5003', {
    transports: ['websocket'] // Enable WebSocket transport
  });

  // Fetch group names and user's assigned groups on component mount
  useEffect(() => {
    getGroup()
    }, []);

  const fetchUserNames = async () => {
    try {
      // Fetch user's assigned groups using an API call
      const userGroupsData = await HttpService.getUser(); // Replace with actual API call
      setNames(userGroupsData.data);
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  };


  const getGroup = async () => {
    try {
      const group = await HttpService.groupName();
      const userGroupIds = userDetails.groups; // Array containing group IDs stored in userDetails.groups
      const filteredGroups = group.data.filter(groupItem => userGroupIds.includes(groupItem._id));
      setGroupNames(filteredGroups);
    } catch (error) {
      console.log(error, "this is the error");
    }
  };

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    fetchUserNames();
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (event, index, data) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedUsers([...selectedUsers, { index, id: data._id }]); // Add index and id to selectedUsers
    } else {
      setSelectedUsers(selectedUsers.filter((item) => item.index !== index)); // Remove index from selectedUsers
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Construct the group data object
      const groupData = {
        groupName: formData.groupName,
        groupImage: formData.groupImage,
        selectedUsers: selectedUsers
      };

      let response = await HttpService.creteGroup(groupData);
      getGroup();

      if (response.ok) {
        // Group created successfully
        // Optionally, you can handle the response here
        console.log('Group created successfully');

        // Emit a socket event to notify the server about the new group creation
        socket.emit('group created', groupData.groupName);
      } else {
        // Error handling
        console.error('Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      // Close the dialog after submission
      handleCloseDialog();
    }
  };

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
            <Typography variant="h6" noWrap component="div" onClick={handleOpenDialog}>
              Create Group
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Divider />
        <List>
          {/* Map over the names and render each as a ListItem */}
          {groupNames.map((el, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${el._id}`}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={el.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Routes>
        <Route path="/:groupId" element={<AddUser />} />
        </Routes>
      </Box>
      {/* Dialog for creating a group */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details for creating a new group.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="groupName"
            name="groupName"
            label="Group Name"
            type="text"
            fullWidth
            value={formData.groupName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="groupImage"
            name="groupImage"
            label="Group Image"
            type="file"
            fullWidth
            value={formData.groupImage}
            onChange={handleChange}
          />
          <DialogContentText>Users:</DialogContentText>
          {/* Render checkboxes for each user */}
          {user ? user.map((el, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`user-${index}`}
                onChange={(event) => handleCheckboxChange(event, index, el)}
                checked={selectedUsers.some((item) => item.index === index)} // Check if index is in selectedUsers
              />
              <label htmlFor={`user-${index}`}>{el.name}</label>
              <label htmlFor={`user-${index}`}>{el.email}</label>
            </div>
          )) : ""}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
