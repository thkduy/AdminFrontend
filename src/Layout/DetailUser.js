import { React } from "react";
import {
    Typography
} from "@material-ui/core";
//import { makeStyles } from '@material-ui/core/styles';
// import authUserContext from '../context/context';

// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
//     tableHead: {
//         color: '#123456',
//         fontWeight: 'bold'
//     }
// });

export default function DetailUser() {
    // const classes = useStyles();
    // const { isAuthenticated, token } = useContext(authUserContext);
    
    // useEffect(() => {
    //     async function fetchData() {
    //         const accessToken = JSON.parse(token);
    //         const response = await getAllUser(accessToken);
    //         const res = await response.json();
    //         if (response.ok) {
    //             setData(res.data);
    //             setResult(res.data);
    //         }
    //     }
    //     fetchData();
    // }, [token]);
    
    return (
        <Typography>Detail user</Typography>
    );
}