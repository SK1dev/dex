import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import styles from './tradeGraph.module.css'

const TradeGraph = () => {
  return (
    <div className={styles.tradeGraphContainer}>
      <TradingViewWidget
        symbol="NASDAQ:AAPL"
        theme={Themes.DARK}
        locale="fr"
        autosize
      />
    </div>
  );
};

export default TradeGraph