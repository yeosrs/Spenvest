import React, { useState, useReducer } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateNewUser from "./CreateNewUser";
const axios = require("axios");

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/yeosrs/Spenvest">
        Spenvest
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const loginReducer = (loginState, action) => {
  switch (action.type) {
    case "email-change":
      //   console.log(loginState);
      return { ...loginState, email: action.payload };

    case "password-change":
      //   console.log(loginState);
      return { ...loginState, password: action.payload };

    default:
      console.log("default selected");
      break;
  }
};

const theme = createTheme();

const LoginTheme = ({ setToken, setEmail }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loginState, loginDispatcher] = useReducer(loginReducer, {
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5001/auth/login`;
      const res = await axios.post(url, {
        email: loginState.email,
        password: loginState.password,
      });
      setToken(res.data.accessToken);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Spenvest
            </Typography>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) =>
                  loginDispatcher({
                    type: "email-change",
                    payload: event.target.value,
                  })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) =>
                  loginDispatcher({
                    type: "password-change",
                    payload: event.target.value,
                  })
                }
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit(loginState)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={handleOpen}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                      <CreateNewUser handleClose={handleClose} />
                    </Box>
                  </Modal>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginTheme;
