import styles from "./trade.module.css";

const Trade = () => {
  return (
    <>
      <div className={styles.tradeFormContainer}>
        <h2>Limit</h2>
        <form>
          <div className={styles.tokenContainer}>
            <select name="tokens" id="tokens">
              <option value="WETH">WETH</option>
              <option value="Link">Link</option>
              <option value="Dai">Dai</option>
              <option value="Matic">Matic</option>
            </select>
          </div>
          <div className={styles.tokenContainer}></div>
          <div className={styles.limitContainer}>
          </div>
        </form>
      </div>
    </>
  );
};

export default Trade;
