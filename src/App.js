import './App.scss';
import './calculator.js'
import { Calculator } from './calculator.js';
import { Footer } from './headerfooter.js';
function App() {
  return (
    <div className="App 
    container-fluid m-0 g-0 d-flex flex-column justify-content-between">
        <h1 className='display-6 text-center p-2'>Calculator</h1>
        <Calculator />
        <Footer />
    </div>
  );
}

export default App;
