import './App.css';
import PricePage from './components/PricePage';
import { CoinProvider } from './context/CoinContext';

function App() {
  return (
    <CoinProvider>
      <PricePage />
    </CoinProvider>
  );
}

export default App;
