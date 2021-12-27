import React from 'react';
import {useRoutes} from "./routes/routes";
import {useSelector} from "react-redux";
import {tokenSelector} from "./modules/auth/selectors";
import {BrowserRouter as Router} from "react-router-dom";
import '../src/styles/layout.scss'
import {carLoadingSelector, carSelector} from "./modules/car/selectors";

function App() {
    const token = useSelector(tokenSelector)
    const car = useSelector(carSelector)
    const carLoading = useSelector(carLoadingSelector)
    const routes = useRoutes(!!token, !!car, carLoading)
    return (
        <Router>
            {routes}
        </Router>
    );
}

export default App;
