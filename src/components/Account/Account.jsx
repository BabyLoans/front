import { useState } from "react";
import Blockie from "../Blockie";
import { connectors } from "./config";
import Address from "../Address/Address";
import { Modal } from "antd";
import { Button } from "reactstrap";
import { useMoralis } from "react-moralis";
import { getExplorer } from "helpers/networks";
import { SelectOutlined } from "@ant-design/icons";
import { getEllipsisTxt } from "helpers/formatters";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "white",
    margin: "0px 10px",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

function Account() {
  const { authenticate, chainId, logout, account, isAuthenticated } =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account) {
    return (
      <>
        <Button
          style={{ backgroundColor: "#e14eca" }}
          size="sm"
          onClick={() => setIsAuthModalVisible(true)}
        >
          <FontAwesomeIcon icon={faWallet} /> Connect Wallet
        </Button>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
            backgroundColor: "rgb(30, 32, 49)",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            Connect Wallet
          </h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <span style={{ fontSize: "14px" }}>{title}</span>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button
        style={{ backgroundColor: "#e14eca" }}
        size="sm"
        onClick={() => setIsModalVisible(true)}
      >
        <h6 style={{ marginRight: "5px", display: "inline", ...styles.text }}>
          {getEllipsisTxt(account, 6)} <Blockie currentWallet scale={2} />
        </h6>
      </Button>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          backgroundColor: "rgb(30, 32, 49)",
        }}
      >
        <h5>Account</h5>
        <br />
        <Address avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
        <a
          href={`${getExplorer(chainId)}/address/${account}`}
          target="_blank"
          rel="noreferrer"
        >
          <SelectOutlined style={{ marginRight: "5px" }} />
          View on Explorer
        </a>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: "#e14eca",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
