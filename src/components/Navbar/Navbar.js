import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import useStyles from "./styles";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("=====nav bar user");
  console.log(user);
  // ***
  // Once user login we need to refresh borwser in order to see the changes, thus
  // we can utilize useEffect(). so we can fire useEffect function as sonn as our url change. / to /auth
  //
  // useEffect(callBackfunction(), variable looking for the changes)
  // once that vaiable change/modify callBackFunction will fire.
  useEffect(() => {
    const userId = user?._id;
    const token = user?.token;
    // Logout the user automatically if token expire due to in-activity.
    // we have set the expire time as 1h in the server.
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="40"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.name}
              src={user.imageUrl}
            >
              {String(user.name).charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
