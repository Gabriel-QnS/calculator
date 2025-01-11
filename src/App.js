import './App.scss';
import './calculator.js'
import { Calculator } from './calculator.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='display-6 text-center p-2'>Calculator</h1>
        <Calculator />
      </header>
    </div>
  );
}

export default App;
