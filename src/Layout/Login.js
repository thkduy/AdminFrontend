import {React, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import authUserContext  from '../context/context';
import jwt from "jsonwebtoken";
import {
    Box, 
    TextField, 
    Grid,
    Button,
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Typography,
    Paper,
} from "@material-ui/core";
import {
    AccountCircle,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import {login} from '../api/index';

export default function Login(){
    const {
        checkAuthenticated,
        signIn,
        setNewToken,
    } = useContext(authUserContext);
    let location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

    const [values, setValues] = useState({
        password: "",
        showPassword: false
      });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleLogin = async () => {

        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;         
        if(!email.match(pattern)){
            setError('Invalid email');
            return;
        }else{
            setError('');
        }

        const response = await login(email, values.password);
        const res = await response.json();
        if(response.ok){
            const user = jwt.decode(res.token);
            checkAuthenticated(true);
            signIn(user);
            setNewToken(res.token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("token", res.token);
            let { from } = location.state || { from: { pathname: "/" } };
            history.push(from);
        }else if (response.status === 400) {
            setError(res.message);
            return;
        }
    };

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item>
            <Paper elevation={3}>
                <Box style={{ width: 300 }}>
                    <Grid
                        container
                        spacing={1}
                        justify="center"
                        style={{ marginTop: 10}}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Login
                            </Typography>
                        </Grid>
                    </Grid>
                    {error.length > 0 ? <Alert severity="error">{error}</Alert> : null}
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                    >
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label="Email"
                                value={email} 
                                style={{ width: 250 }} 
                                onChange={handleEmailChange}    
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                    >
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                        style={{ marginTop: 20, marginBottom: 10 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            disabled={!email.trim().length > 0 || !values.password.trim().length > 0 }
                            style={{ width: '50%', marginBottom:20 }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Box>
            </Paper>
            </Grid>
        </Grid>
    );
}