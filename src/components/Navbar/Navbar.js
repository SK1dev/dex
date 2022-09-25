import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <ul>
            {/*<img src={} alt='' />*/}
            <li><button>Ethereum</button></li>
            <li><button>Connect Wallet</button></li>
        </ul>
    </nav>
  )
}

export default Navbar