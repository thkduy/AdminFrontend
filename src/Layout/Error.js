import { React } from "react";
import { useHistory } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    Button
} from "@material-ui/core";

export default function Home() {
    const history = useHistory();

    const handleClick = () => history.push('/');
    return (
        <Container maxWidth="lg">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h1">404</Typography>
                <Typography variant="h3">PAGE NOT FOUND</Typography>
                <Typography variant="h6">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</Typography>
                <br/>
                <Button variant="outlined" color="primary" onClick={handleClick}>Go to Homepage</Button>
            </Box>
        </Container>
    );
}