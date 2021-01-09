import { React, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Box
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import authUserContext from '../context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    cursor: 'pointer',
  },
  menuItem: {
    cursor: 'pointer',
    marginLeft: 20,
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

    checkAuthenticated(false);
    signIn([]);
    setNewToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleClick = () => {
    history.push("/");
  }

  const handleHistoryClick = () => history.push("/history-game");

  return (
    <AppBar position="static" style={{ marginBottom: 20 }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" flexDirection="row" alignItems="center" width="50%">
            <Typography onClick={handleClick} variant="h6" className={classes.title}>
              CaroOnline
            </Typography>
            {isAuthenticated ? <><Typography onClick={handleClick} variant="h6" color="secondary" className={classes.menuItem}>
              Dashboard
            </Typography>
              <Typography onClick={handleHistoryClick} variant="h6" color="secondary" className={classes.menuItem}>
                Game History
            </Typography></> : null}

          </Box>

          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"

              >
                <Typography variant="h6" style={{ paddingLeft: 5 }}>
                  Hello {name}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
