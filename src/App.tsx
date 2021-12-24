import React from 'react';
import {useRoutes} from "./routes/routes";
import {useSelector} from "react-redux";
import {tokenSelector} from "./modules/auth/selectors";
import {BrowserRouter as Router} from "react-router-dom";
import '../src/styles/layout.scss'

function App() {
  const token = useSelector(tokenSelector)
  const routes = useRoutes(!!token)
  return (
      <Router>
        {routes}
      </Router>
  );
}

export default App;
