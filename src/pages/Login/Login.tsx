import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import "./style.css";
import googleIcon from "../../assets/icons8-google-logo.svg";

export const Login = () => {
  const { googleAuth } = useAuth();

  const handleGoogleAuth = () => {
    googleAuth();
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "#EEEEEE",
        height: "100vh",
      }}
    >
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            width: "554px",
            height: "fit-content",
            margin: "0 auto",
            marginBottom: "10vh",
            paddingBottom: "52px",
            paddingTop: "52px",
            paddingLeft: "94px",
            paddingRight: "94px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: `1px solid #E0E0E0`,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ marginTop: "24px", color: "#212121" }}
          >
            Hello
          </Typography>
          <Typography
            sx={{
              marginTop: "8px",
              height: " 40px",
              display: " flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            To continue log in through google
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleGoogleAuth()}
          >
            <img src={googleIcon} />
            <Typography sx={{ marginLeft: "21px" }}>
              Sign in with google
            </Typography>
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
