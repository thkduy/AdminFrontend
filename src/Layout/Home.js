import { React, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Box, Avatar,
    Grid, IconButton, TextField, FormControl, Select, Tooltip
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GamesIcon from '@material-ui/icons/Games';
import swal from "sweetalert";
import { makeStyles } from '@material-ui/core/styles';
import authUserContext from '../context/context';
import { getAllUser, lockAccount } from "../api";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHead: {
        color: '#123456',
        fontWeight: 'bold'
    }
});

export default function Home() {
    const classes = useStyles();
    const history = useHistory();
    const { 
        token,
        checkAuthenticated,
        signIn,
        setNewToken
    } = useContext(authUserContext);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [search, setSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState('Email');

    useEffect(() => {
        async function fetchData() {
            const response = await getAllUser(token);
            const res = await response.json();
            if (response.ok) {
                setData(res.data);
                setResult(res.data);
            } else if(response.status === 401){
                checkAuthenticated(false);
                signIn([]);
                setNewToken("");
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("token");
            }
        }
        fetchData();
    }, [token, checkAuthenticated, signIn, setNewToken]);

    const handleChangecbb = (event) => {
        setTypeSearch(event.target.value);
        if(search==="") {
            let arrayCopy = [...data];
            setResult(arrayCopy);
        }
        else{
            let arrayCopy = [...data];
            if(event.target.value === 'Email'){
                const newArr = arrayCopy.filter(item => item.email.includes(search));
                setResult(newArr);
            } else {
                const newArr = arrayCopy.filter(item => item.name.includes(search));
                setResult(newArr);
            }
        }
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
        if(event.target.value==="") {
            let arrayCopy = [...data];
            setResult(arrayCopy);
        }
        else{
            let arrayCopy = [...data];
            if(typeSearch === 'Email'){
                const newArr = arrayCopy.filter(item => item.email.includes(event.target.value));
                setResult(newArr);
            } else {
                const newArr = arrayCopy.filter(item => item.name.includes(event.target.value));
                setResult(newArr);
            }
        }
    } 

    async function handleLockAcc(id) {
        const accessToken = JSON.parse(token);
        const response = await lockAccount(accessToken, id);
        const res = await response.json();
        if (response.ok) {
            const newDataArray = [...result];
            for(let i = 0; i< newDataArray.length; i++){
                if(newDataArray[i]._id===id){
                    newDataArray[i].isDelete = true;
                    break;
                }
            }
            await swal({
                title: `${res.message}`,
                icon: "success",
                buttons: {
                    ok: "OK"
                }
            });
            setResult(newDataArray);
        }
    }

    function handleViewDetail(id){
        history.push(`/view-detail-user?userid=${id}`);
    }

    function handleViewHistory(id){
        history.push(`/history-game-user?userid=${id}`);
    }
    
    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" style={{ marginBottom: 20 }}>
                <Typography variant="h4">Dashboard</Typography>
                <Box display="flex" flexDirection="row" >
                    <TextField size="small" label="Search user" type="search" variant="outlined" value={search} onChange={handleChange} />
                    <FormControl size="small" variant="outlined" style={{ marginLeft: 10 }}>
                        <Select native value={typeSearch} onChange={handleChangecbb}>
                            <option value={"Email"}>Email</option>
                            <option value={"Name"}>Name</option>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell width="10%" align="center">ID</TableCell>
                            <TableCell width="30%">User</TableCell>
                            <TableCell width="20%" align="center">Account type</TableCell>
                            <TableCell width="20%" align="center">Status</TableCell>
                            <TableCell width="20%" align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result && result.length > 0 ? result.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Grid container direction="row" alignItems="center" >
                                        <Avatar src={user.avatar} />
                                        <Box style={{ marginLeft: 10 }}>
                                            <Typography>{user.name}</Typography>
                                            <Typography>{user.email}</Typography>
                                        </Box>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center">{user.accountType}</TableCell>
                                <TableCell align="center">
                                    {user.isDelete ? "Banned" : "Active"}
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="View detail" arrow>
                                        <IconButton onClick={() => handleViewDetail(user._id)}>
                                            <VisibilityIcon style={{ color: '#0000FF' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="View game history" arrow>
                                        <IconButton onClick={() => handleViewHistory(user._id)}>
                                            <GamesIcon style={{ color: '#ADD8E6' }} />
                                        </IconButton>
                                    </Tooltip>
                                    {user.isDelete ? null :
                                        <Tooltip title="Ban user" arrow>
                                            <IconButton onClick={() => handleLockAcc(user._id)}>
                                                <HighlightOffIcon color="error" />
                                            </IconButton>
                                        </Tooltip>}
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}