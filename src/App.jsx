import "./style.css";
import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Loans from "./pages/Loans";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import { useMoralis } from "react-moralis";
import Account from "components/Account/Account";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartPie, faCogs, faBell, faBars } from "@fortawesome/free-solid-svg-icons";

import { Content } from "antd/lib/layout/layout";

const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Verdana",
    color: "#041836",
    padding: "0px 10px 0px 10px",
    maxHeight: "100vh",
    overflow: "auto",
  },
  header: {
    position: "static",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Verdana",
    borderBottom: "5px solid rgba(0, 0, 0, 0.06)",
    padding: "30px",
  },
  headerRight: {
    gap: "20px",
    display: "flex",
    fontSize: "15px",
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "space-around",
  },
  siderMenu: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const [actualPage, setActualPage] = React.useState("Dashboard");

  React.useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Layout>
          <Header style={styles.header}>
            <h4>
              <img
                className="img-fluid rounded-circle"
                src={require("assets/img/bbl_logo.png").default}
                style={{ width: "35px", display: "inline" }}
              />
              { ' '}
              {actualPage}
            </h4>
           
            <div style={styles.headerRight}>
              <Link style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.85)" }} to="/dashboard" onClick={() => setActualPage("Dashboard")}>
                <FontAwesomeIcon icon={faHome}/>
              </Link>
              <Link style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.85)" }} to="/loans" onClick={() => setActualPage("Supply / Borrow")}>
                <FontAwesomeIcon icon={faChartPie}/>
              </Link>
              <Link style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.85)" }} to="/settings" onClick={() => setActualPage("Settings")}>
                <FontAwesomeIcon icon={faCogs}/>
              </Link>
              {/* <FontAwesomeIcon icon={faBell}/> */}
              <Account />
            </div>
          </Header>

          <Content style={styles.content}>
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
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;
