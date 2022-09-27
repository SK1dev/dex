

const Trade = () => {
  

  return (
    <>
      <div className={styles.tradeFormContainer}>
        <div className={styles.tradeSubheadings}>
          <h3>Swap</h3>
          <h3>Limit</h3>
          <h3>P2P</h3>
        </div>
        <form>
          <div className={styles.tokenContainer}>
            <a className={styles.tradeFormLink} href="#">
              You sell
            </a>
            <div className={styles.tokensRow}>
              <select name="tokens" id="tokens">
                <option value="WETH">WETH</option>
                <option value="Link">Link</option>
                <option value="Dai">Dai</option>
                <option value="Matic">Matic</option>
              </select>
              <p>Dai Stablecoin</p>
            </div>
          </div>
          <div className={styles.tokenContainer}>
            <a className={styles.tradeFormLink} href="#">
              You buy
            </a>
            <div className={styles.tokensRow}>
              <select name="tokens" id="tokens">
                <option value="WETH">WETH</option>
                <option value="Link">Link</option>
                <option value="Dai">Dai</option>
                <option value="Matic">Matic</option>
              </select>
              <p>Dai Stablecoin</p>
            </div>
          </div>
          <div className={styles.limitContainer}>
            <div className={styles.buySellButtons}>
              <button
                className={styles.tradeBuyFormLink}
                style={
                  isSell
                    ? { color: "#6c86ad", borderColor: "#6c86ad" }
                    : { color: "white", borderColor: "#5AC4BE" }
                }
                onClick={() => {
                  setIsSell(false);
                }}
              >
                BUY
              </button>
              <button
                className={styles.tradeSellFormLink}
                style={
                  isSell
                    ? { color: "white", borderColor: "#5AC4BE" }
                    : { color: "#6c86ad", borderColor: "#6c86ad" }
                }
                onClick={() => {
                  setIsSell(true);
                }}
              >
                SELL
              </button>
            </div>
            <div className={styles.limitMarketContainer}>
              <form className={styles.limitForm}>
                <p>Limit</p>
                <div className={styles.formGroup}>
                  <label>Limit Price</label>
                  <input type="number" />
                </div>
                <div className={styles.formGroup}>
                  <label>Amount</label>
                  <input type="number" />
                </div>
                <div className={styles.formGroup}>
                  <label>Total</label>
                  <input type="number" />
                </div>
                <button>Limit {isSell ? "Sell" : "Buy"}</button>
              </form>
              <form className={styles.marketForm}>
                <p>Market</p>
                <label className={styles.marketPriceLabel}>Market Price</label>
                <div className={`${styles.formGroupText} ${styles.formGroup}`}>
                  <p>Best Market Price</p>
                </div>
                <div className={styles.formGroup}>
                  <label>Amount</label>
                  <input type="number" />
                </div>
                <div className={styles.formGroup}>
                  <label>Total</label>
                  <input type="number" />
                </div>
                <button>Market {isSell ? "Sell" : "Buy"}</button>
              </form>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Trade;
