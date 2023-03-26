import './header.scss';
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import axios from 'axios';


interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;

}

const Header = () => {
    const [products, setProducts] = useState<ProductProps[]>([])

    const getData = async () => {
        try {
            const res = await axios.get('https://dummyjson.com/products')
            setProducts(res.data.products)

        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='header'>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                        <SwiperSlide className='slide'>
                            <img src='https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="Pic" />
                        </SwiperSlide>
                        <SwiperSlide className='slide'>
                            <img src='https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=800' alt="Pic" />
                        </SwiperSlide>
                        <SwiperSlide className='slide'>
                            <img src='https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=800' alt="Pic" />
                        </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Header