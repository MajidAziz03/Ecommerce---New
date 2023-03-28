import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'
import Products from '../products/Products'

const Home = () => {

    return (
        <>
            <Navbar />
            <Header />
            <Products />
        </>
    )
}

export default Home;