import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Cart from './Components/cart/Cart';
import Home from './Components/Homepage/Home';
import Login from './Components/login/Login';
import Product from './Components/product/Product';
import ProductList from './Components/productlist/ProductList';
import Single from './Components/single/Single';
import { useAppSelector } from './redux/hooks';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/single/:id' element={<Single />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
