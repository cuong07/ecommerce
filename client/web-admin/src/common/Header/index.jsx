import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "@mui/icons-material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {user} = useSelector(state => state.auth.login.currentUser.data)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="h-[80px] flex justify-between pl-8 pr-8 items-center shadow-md z-40">
      <div>
        <span className="text-3xl font-bold">Admin</span>
      </div>
      <div>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Typography
            component="p"
            variant="p"
            sx={{ display: "flex", alignItems: "center" }}
          >
          {user?.email}
          </Typography>
          <Avatar
            sx={{ width: "32px", height: "32px", cursor: "pointer" }}
            onClick={handleClick}
            src={user?.image}
          >
          </Avatar>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 1, pl: 2, pr: 2 }}>
              <List>
                <ListItem button component={Link} to="/logout" sx={{ p: 0 }}>
                  <ListItemIcon sx={{ width: "20%" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" sx={{flex: '1'}} />
                </ListItem>
              </List>
            </Typography>
          </Popover>
        </Box>
      </div>
    </div>
  );
};

export default Header;
