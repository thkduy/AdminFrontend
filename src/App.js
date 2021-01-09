import { React } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ContextProvider from './context/withContext.js';
import Layout from './Layout';


export default function App() {
    return (
        <Router>
            <ContextProvider>
                <Layout />
            </ContextProvider>       
        </Router>
    );
}