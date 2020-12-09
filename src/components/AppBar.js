import {React, useState, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Button,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import authUserContext  from '../context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  }
}));

export default function MenuAppBar() {
  const {
    isAuthenticated,
    checkAuthenticated,
    signIn,
    setNewToken,
  } = useContext(authUserContext);
  const history = useHistory();
  const classes = useStyles();
  const data = useContext(authUserContext);
  const name = data.user.name;
  const auth = data.isAuthenticated;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);

    checkAuthenticated(!isAuthenticated);
    signIn([]);
    setNewToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    history.push("/");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  const handleClick = () => {
    history.push("/");
  }

  return (
    <div className={classes.root} style={{ marginBottom: 20 }}>
      <AppBar position="static" >
        <Toolbar>
          <Typography onClick={handleClick} variant="h6" className={classes.title}>
            CaroOnline
          </Typography>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                
              >
                <AccountCircle />
                <Typography style={{paddingLeft: 5}}>
                  {name}
                </Typography>
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
