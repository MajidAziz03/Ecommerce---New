import React, { useEffect } from 'react'
import './navbar.scss';
import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/userSlice';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';



const Navbar = () => {
    const quantity = useAppSelector((state) => state.product.items)
    const dispatch = useAppDispatch()
    const router = useNavigate()
    const user = useAppSelector((state) => state.user.user.accessToken)



    const handleLogout = () => {
        try {
            dispatch(logout())
            router('/login')
            toast.success("Logout Successfully")
        }
        catch (error) {
            toast.error("Error occurred")
        }
    }

    return (
        <div className='navbar'>
            <div className="left">
                <h3>--store</h3>
            </div>
            <div className="right">
                <ul>
                    <NavLink to='/' style={{ color: "inherit", textDecoration: "none" }}><li>Home</li></NavLink>
                    <li>About</li>
                    <NavLink to='/products' style={{ color: "inherit", textDecoration: "none" }}><li>Products</li></NavLink>
                    <li>Feature</li>
                    <li>Contact</li>
                    <Link to='/cart' style={{ color: "inherit", textDecoration: "none" }}>
                        <Badge badgeContent={quantity.length} sx={{ color: "red", fontSize: "12px" }}>
                            <ShoppingCartOutlined color='primary' />
                        </Badge>
                    </Link>
                    {
                        user
                            ?
                            <li onClick={handleLogout}>Logout</li>
                            :
                            <Link style={{ color: "inherit", textDecoration: "none" }} to='/login'>
                                <li >Login</li>
                            </Link>
                    }

                </ul>
            </div>
        </div>
    )
}

export default Navbar;