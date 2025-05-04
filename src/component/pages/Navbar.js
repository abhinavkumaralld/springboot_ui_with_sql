import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAuth, removeAuth } from "../../redux/AuthSlice";
// You can use any image/logo you want
const logoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"; // replace with your own if needed

const Navbar = () => {
  const authObject = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    sessionStorage.clear();
    dispatch(removeAuth());
    navigate("/login");
  };

  // useEffect(() => {
  //   setUsername(authObject.username);
  // }, []);

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side: Logo and Company Name */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar alt="Logo" src={logoUrl} sx={{ width: 40, height: 40 }} />
          <Typography variant="h6" fontWeight={600}>
            ABHINAV
          </Typography>
        </Stack>

        {/* Right Side: User Info + Logout */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {authObject?.photoUrl ? (
            <Avatar
              alt="Logo"
              src={authObject?.photoUrl || logoUrl}
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <PersonIcon />
          )}
          <Typography variant="body1">{authObject?.username}</Typography>
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
