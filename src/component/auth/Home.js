import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Stack } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            p: 4,
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please login or sign up to continue.
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/login")}
              sx={{ px: 4 }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate("/signup")}
              sx={{ px: 4 }}
            >
              Signup
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
