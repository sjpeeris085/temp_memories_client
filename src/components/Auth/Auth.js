import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { signin, signup } from "../../actions/auth";
import Input from "./Input";
import Icon from "./icon";
import useStyles from "./styles";
import { AUTH } from "../../constants/actionTypes";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (isSignup) {
      // signup
      // we pass the history also that use to navigate after signIn or signUp
      dispatch(signup(formData, history));
    } else {
      //signin
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    // update formData element only changes happened.
    // we use spread operator (...) to update one element in obj as belows.
    // {...ObjName, key:newValue}
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // console.log(res);
    // console.log(jwt_decode(res.credential));
    const { name, picture, sub } = jwt_decode(res.credential);
    const user = {
      _id: sub,
      _type: "user",
      name: name,
      imageUrl: picture,
      token: res.credential,
    };

    try {
      dispatch({ type: AUTH, data: user });
      // Redirect to Home page
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Sign In was unsuccessful. Try again later.");
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          {isSignup ? "Sin Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button type="button" onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
