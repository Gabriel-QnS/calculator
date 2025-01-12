import './App.scss';
import './calculator.js'
import { Calculator } from './calculator.js';
import { Footer, Header } from './headerfooter.js';
function App() {
  return (
    <div className="App 
    container-fluid m-0 g-0 d-flex flex-column justify-content-between">
      <Header />
      <Calculator />
      <Footer />
    </div>
  );
}

export default App;
