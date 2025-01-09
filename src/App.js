import logo from './logo.svg';
import './App.css';
import { Button, Col, Row } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar.js';
import AllProduct from './Components/AllProduct.js';
import ProductDetailsForm from './Components/ProductDetails.js';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('products');
  const [data, setData] = useState();

  const handlePage = (navToPage, data) => {
    setPage(navToPage);
    setData(data);
  }

  return (
    <div className="App">
      <div className="App">
        <Row>
          <Col>
            <NavigationBar />
            {page.toLowerCase() === 'products' &&
              <AllProduct handlePage={handlePage} />
            }
            {page.toLowerCase() === 'edit-product' &&
              <ProductDetailsForm productInfo={data} />
            }
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
