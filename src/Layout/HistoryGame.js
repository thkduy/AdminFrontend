import { React, useState, useContext, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Box, Avatar,
    Grid, IconButton, Tooltip
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

export default function Home() {
    const classes = useStyles();
    //const history = useHistory();
    const { token } = useContext(authUserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const accessToken = JSON.parse(token);
            const response = await getAllRoom(accessToken);
            const res = await response.json();
            if (response.ok) {
                setData(res.data);
            }
        }
        fetchData();
    }, [token]);
    
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" style={{marginBottom:20}}>Game history</Typography>
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
                                        <IconButton>
                                            <VisibilityIcon style={{color:'#0000FF'}}/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container> 
    );
}