import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import Navbar from '../navbar/Navbar';
import './single.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;
}


const Single = () => {
    const cart = useAppSelector((state) => state.product)
    const dispatch = useAppDispatch()
    const history = useLocation()

    const path = (history.pathname.split('/')[2])
    const router = useNavigate()

    const [data, setData] = useState<ProductProps>()


    const singleProduct = async () => {
        const res = await axios.get(`https://dummyjson.com/products/${path}`)
        setData(res.data)
    }


    useEffect(() => {
        singleProduct()
    }, [])


    const handleCart = async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/${path}`)
            dispatch(addToCart(res.data))
        }
        catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className='single'>
                <div className="left">
                    <div className="first">
                        <img src="https://images.pexels.com/photos/13419559/pexels-photo-13419559.jpeg" alt="" />
                        <img src="https://images.pexels.com/photos/13419559/pexels-photo-13419559.jpeg" alt="" />
                        <img src="https://images.pexels.com/photos/13419559/pexels-photo-13419559.jpeg" alt="" />
                        <img src="https://images.pexels.com/photos/13419559/pexels-photo-13419559.jpeg" alt="" />
                    </div>
                    <div className="second">
                        <img src={data?.thumbnail} alt="" />
                    </div>
                </div>
                <div className="right">
                    <h1> {data?.title}</h1>
                    <div className="rating">rating : 5</div>
                    <div className="price">Rs :{data?.price}/=</div>
                    <div className="desc">{data?.description}</div>
                    <div className="color">
                        <h3>Choose Color </h3>
                        <div className="colors">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div>
                        <select className="size">
                            <option> Select size</option>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="large">large</option>
                        </select>
                    </div>
                    <div>
                        <Button variant='contained' size='small' onClick={handleCart}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Single;