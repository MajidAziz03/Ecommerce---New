import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import Check from '../checkComp/Check';
import Navbar from '../navbar/Navbar';
import './cart.scss';

const Cart = () => {
    const cartData = useAppSelector((state) => state.product.items)
    const userToken = useAppSelector((state) => state.user.user.token)

    
    return (
        <>
            <Navbar />
            {
                cartData.length > 0
                    ?
                    (
                        <div className='cart'>
                            <div className="left">
                                <div className='container'>
                                    <div className="head">
                                        <h2>Shopping Cart</h2>
                                        <h2>Items : {cartData.length}  </h2>
                                    </div>
                                    <hr className='hr' />
                                    <Check />
                                </div>
                            </div>
                            <div className="right">
                                <h1 className='title'> Order Summary </h1>
                                <div className='hrdiv'>
                                    <hr className='hr' />
                                </div>
                                <div className='items'>
                                    <span>Items 3</span>
                                    <span> $459 </span>
                                </div>
                                <div className='shippingContainer'>
                                    <h6> Shipping </h6>
                                    <span> </span>
                                    <select name='shipping' >
                                        <option value="standard" > Standard Shipping</option>
                                        <option value=""> Delivery</option>
                                    </select>
                                    <input type="text" placeholder='PROMO CODE' />
                                    <Button variant='contained' sx={{ backgroundColor: "pink", width: "30%" }} size='small'> Apply </Button>
                                </div>
                                <div className="hrdiv">
                                    <hr className='hr' />
                                </div>
                                <div className="total">
                                    <span>Total</span>
                                    <span>$365</span>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='cart emptyCart'>
                        <div className="left">
                                <div className='container'>
                                    <div className="head">
                                        <h2>Shopping Cart</h2>
                                        <h2>Items : {cartData.length}  </h2>
                                    </div>
                                    <hr className='hr' />
                                    <div className="empty">
                                        <h1> Your cart is empty </h1>
                                    </div>
                                </div>
                            </div>
                        <div className="right">
                            <h1 className='title'> Order Summary </h1>
                            <div className='hrdiv'>
                                <hr className='hr' />
                            </div>
                            <div className='items'>
                                <span>Items 3</span>
                                <span> $459 </span>
                            </div>
                            <div className='shippingContainer'>
                                <h6> Shipping </h6>
                                <span> </span>
                                <select name='shipping' >
                                    <option value="standard" > Standard Shipping</option>
                                    <option value=""> Delivery</option>
                                </select>
                                <input type="text" placeholder='PROMO CODE' />
                                <Button variant='contained' sx={{ backgroundColor: "pink", width: "30%" }} size='small'> Apply </Button>
                            </div>
                            <div className="hrdiv">
                                <hr className='hr' />
                            </div>
                            <div className="total">
                                <span>Total</span>
                                <span>$365</span>
                            </div>
                        </div>
                    </div>
                    )
            }
        </>
    )
}

export default Cart;