import styles from "./navbar.module.css";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "./logo.png";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <img className={styles.logo} src={logo} alt="logo" />
        </li>
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
          <button className={styles.connectButton}>
            <FaWallet />
            Connect Wallet
          </button>
        </li>
        <li className={styles.settingsIcon}>
          <IoSettingsOutline />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
