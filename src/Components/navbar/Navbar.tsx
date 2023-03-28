import React, { useEffect } from 'react'
import './navbar.scss';
import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/userSlice';




const Navbar = () => {
    const quantity = useAppSelector((state) => state.product.items)
    const user = useAppSelector((state) => state.user.user.token)
    const dispatch = useAppDispatch()
    const router = useNavigate()

    const handle = () => {
        dispatch(logout())
        router('/login')
    }

    return (
        <div className='navbar'>
            <div className="left">
                <h3>-majid-store</h3>
            </div>
            <div className="right">
                <ul>
                    <Link to='/'><li>Home</li></Link>
                    <li>About</li>
                    <li>Products</li>
                    <li>Feature</li>
                    <li>Contact</li>
                    {
                        user
                            ?
                            <Link to='/cart' >
                                <Badge badgeContent={quantity.length} sx={{ color: "red", fontSize: "12px" }}>
                                    <ShoppingCartOutlined color='primary' />
                                </Badge>
                            </Link>
                            :
                            <Link to='/login'>
                                <li >Login</li>
                            </Link>
                    }
                    {
                        user ?
                            <span style={{ cursor: "pointer" }} onClick={handle}>Logout</span>
                            :
                            ''
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;