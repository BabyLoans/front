import "./style.css";
import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import Loans from "./pages/Loans";
import Dashboard from "./pages/Dashboard";
import { useMoralis } from "react-moralis";
import Text from "antd/lib/typography/Text";
import TokenPrice from "components/TokenPrice";
import Account from "components/Account/Account";
import { HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

const { Header, Footer, Sider } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "static",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Raleway",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "20px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  siderMenu: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  }
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  const [actualPage, setActualPage] = React.useState("Dashboard");

  React.useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Sider width={100}>
          <Menu style={styles.siderMenu}>
            <Menu.Item key="item_bbl_price" style={{marginTop: "1em"}}>
              <TokenPrice
                address="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
                chain="bsc"
                image="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png"
                size="20px"
              />
            </Menu.Item>
            <Menu.ItemGroup>
              <Menu.Item key="item_move_to_dashboard">
                <Link to='/dashboard' onClick={() => setActualPage("Dashboard")}><HomeOutlined /></Link>
              </Menu.Item>
              <Menu.Item key="item_move_to_loans">
                <Link to='/loans' onClick={() => setActualPage("Supply / Borrow")}><PieChartOutlined /></Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Layout>
          <Header style={styles.header}>
              <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                {actualPage}
              </Text>
              <Account />
            </Header>
            <div style={styles.content}>
              <Switch>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/loans">
                  <Loans />
                </Route>
                <Route path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <Route path="/nonauthenticated">
                  <>Please login using the "Authenticate" button</>
                </Route>
              </Switch>
            </div>
          <Footer style={{ textAlign: "center" }}>
          </Footer>
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;