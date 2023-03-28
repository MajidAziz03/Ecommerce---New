import { useEffect, useState } from 'react';
import { products } from '../../utils';
import { ProductProps } from '../products/Products';
import './productList.scss';
import Product from '../product/Product';
import Navbar from '../navbar/Navbar';





const ProductList = () => {
    const [data, setData] = useState<ProductProps[]>([])

    useEffect(() => {
        products().then(res => setData(res))
    }, [])

    return (
        <>
            <Navbar />
            <div className='list'>
                {
                    data.map((item) => (
                        <Product items={item} />
                    ))
                }
            </div>
        </>
    )
}

export default ProductList;