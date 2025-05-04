import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  AssignmentInd,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roles = ["User", "Admin", "Manager"];

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    photoUrl: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/save", {
        username: formData.username,
        emailId: formData.email,
        password: formData.password,
        photoUrl: formData.photoUrl,
        role: formData.role,
      });
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #8360c3, #2ebf91)",
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
          maxWidth: 450,
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
          Sign Up
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
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
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
            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentInd />
                  </InputAdornment>
                ),
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Photo URL"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              Register
            </Button>
          </Stack>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">Already have an account?</Typography>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupPage;
