import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Cart from './Components/cart/Cart';
import Login from './Components/login/Login';
import Product from './Components/product/Product';
import Products from './Components/products/Products';
import Single from './Components/single/Single';
import { useAppSelector } from './redux/hooks';

function App() {

  const user = useAppSelector((state) => state.user.user.token)

console.log("user Token", user)
  
  return (
    <Router>
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/single/:id' element={<Single />} />
        {
          user
            ?
            <Route path='/products' element={<Products />} />
            :
            <Route path='/login' element={<Login />} />
        }
      </Routes>
    </Router>
  );
}

export default App;
