import { ethers } from "ethers";
import Web3 from "web3";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "./logo.png";

const Navbar = () => {
  const [balance, setBalance] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance("ethers.eth").then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
  });

  function connect() {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.enable().then(() => {
      const signer = provider.getSigner();
      signer.getAddress().then((result) => {
        setAddress(result);
        setIsConnected(true);
      });
    });
  }

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <img className={styles.logo} src={logo} alt="logo" />
        </li>
        {!isConnected ? (
          <div className={styles.contentNotConnected}>
            <div className={styles.navMenu}>
              <li>Trade</li>
              <li>DAO</li>
              <li>Earn</li>
              <li>Bridges</li>
            </div>
            <li>
              <button className={styles.tokenButton}>
                <FaEthereum />
                Ethereum
              </button>
            </li>
            <li>
              <button onClick={connect} className={styles.connectButton}>
                <FaWallet />
                Connect Wallet
              </button>
            </li>
            <li className={styles.settingsIcon}>
              <IoSettingsOutline />
            </li>
          </div>
        ) : (
          <div className={styles.contentConnected}>
            <div className={styles.navMenu}>
              <li>Trade</li>
              <li>DAO</li>
              <li>Earn</li>
              <li>Bridges</li>
            </div>

            <div className={styles.connectDetails}>
              <h3>Eth balance: {balance.slice(0, 6)}</h3>
              <h3>Address: {address.slice(0, 6)}...{address.slice(address.length - 4)}</h3>
            </div>
            <li>
              <button className={styles.tokenButton}>
                <FaEthereum />
                Ethereum
              </button>
            </li>
            <li>
              <button className={styles.connectButton}>
                <FaWallet />
                Connected
              </button>
            </li>
            <li className={styles.settingsIcon}>
              <IoSettingsOutline />
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
