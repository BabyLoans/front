import "./style.css";
import React from "react";
import Loans from "./pages/Loans";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HeaderNavbar from "components/HeaderNavbar";

const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  React.useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Router>
      <HeaderNavbar />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/loans">
          <Loans />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/nonauthenticated">
          <>Please login using the "Authenticate" button</>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
