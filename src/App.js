import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar.js';
import AllProduct from './Components/AllProduct.js';
import ProductDetailsForm from './Components/ProductDetails.js';

function App() {
  return (
    <div className="App">
      <div className="App">
        <NavigationBar />
        {/* <AllProduct /> */}
        <ProductDetailsForm />
      </div>
    </div>
  );
}

export default App;
