import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAuth, removeAuth } from "../../redux/AuthSlice";
import axios from "axios";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = formData.username;
      const password = formData.password; // Replace with your actual password

      const token = btoa(`${username}:${password}`); // base64 encode
      const response = await axios.get("http://localhost:8080/user/", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      dispatch(
        addAuth({
          username: response.data?.username,
          password: password,
          photoUrl: response.data?.photoUrl,
        })
      );
      navigate("/task");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ff9966, #ff5e62)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          gutterBottom
          textAlign="center"
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Stack>
        </form>

        {/* Signup button */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">Don't have an account?</Typography>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
