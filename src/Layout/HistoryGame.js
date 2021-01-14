import { React, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Box, Avatar,
    Grid, IconButton, Tooltip, CircularProgress
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import authUserContext from '../context/context';
import { getAllRoom } from "../api";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHead: {
        color: '#123456',
        fontWeight: 'bold'
    }
});

export default function HistoryGame() {
    const classes = useStyles();
    const history = useHistory();
    const { 
        token,
        checkAuthenticated,
        signIn,
        setNewToken
    } = useContext(authUserContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await getAllRoom(token);
            const res = await response.json();
            if (response.ok) {
                setData(res.data);
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

    function handleViewChat(id){
        history.push(`/view-chat?roomid=${id}`);
    }
    
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" style={{marginBottom:20}}>Game history</Typography>
            {data ? 
            data.length === 0 ? <Typography variant="h4">None match was found</Typography>:
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell width="10%" align="center">ID</TableCell>
                            <TableCell width="30%" >Game</TableCell>
                            <TableCell width="20%" align="center">Game ID</TableCell>
                            <TableCell width="20%" align="center">Result</TableCell>
                            <TableCell width="20%" align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? data.map((game, index) => (
                            <TableRow key={index}>
                            <TableCell component="th" scope="row" align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Grid container direction="row" alignItems="center" > 
                                        <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
                                            <Avatar src={game.player1.avatar} />
                                            <Box style={{ marginLeft: 10 }}>
                                                <Typography>{game.player1.name}</Typography>
                                                <Typography>Turn: X</Typography>
                                            </Box>
                                        </Box>
                                        <Typography>VS</Typography>
                                        <Box display="flex" justifyContent="center" alignItems="center" ml={2}>
                                            <Avatar src={game.player2.avatar} />
                                            <Box style={{ marginLeft: 10 }}>
                                                <Typography>{game.player2.name}</Typography>
                                                <Typography>Turn: O</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    {game.roomId}
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center">
                                    {game.result === 1 ? <Avatar src={game.player1.avatar} />:null}
                                    {game.result === 2 ? <Avatar src={game.player2.avatar} />:null}
                                    {game.result === 0 ? <Avatar variant="rounded" style={{width:100}}>DRAW</Avatar>:null}
                                    </Box>   
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="View game messages" arrow>
                                        <IconButton onClick={() => handleViewChat(game.roomId)}>
                                            <VisibilityIcon style={{color:'#0000FF'}}/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>: <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>}
        </Container> 
    );
}