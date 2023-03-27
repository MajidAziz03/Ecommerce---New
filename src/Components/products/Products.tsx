import { useEffect, useState } from 'react';
import Product from '../product/Product';
import './products.scss';
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  brand: string;
  thumbnail: string;

}

const Products = () => {
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
    <>
      <Navbar />
      <Header />
      <div className="swiper-container">
        <Swiper
          slidesPerView={4.5}
          spaceBetween={30}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="swiper"
        >
          {
            products.map((item: ProductProps, i) => (
              <>
                <SwiperSlide>
                  <Product items={item} />
                </SwiperSlide>
              </>
            ))
          }
        </Swiper>
      </div>
    </>
  )
}

export default Products;