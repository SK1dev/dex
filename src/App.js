import Trade from "./components/Trade/Trade";
import TradeGraph from "./components/TradeGraph/TradeGraph";
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div className="App">
            <Navbar />
      <div className='tradeContent'>
      <TradeGraph />
      <Trade />
      </div>
    </div>
  );
};

export default App;