import { ShoppingBagOutlined } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './product.scss';


interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;
}

interface Props {
    items: ProductProps
}


const Product = ({ items }: Props) => {

    return (
        <div className='product'>
            <Link to={`/single/${items.id}`} >
                <div className="picture">
                    <img src={items.thumbnail} alt="" />
                </div>
            </Link>
            <div className="info">
                <h3> {items.title} </h3>
                <div className="description">
                    {items.description}
                </div>
                <span> Rs: {items.price}/= </span>
            </div>
            <div className="rating">
                {items.brand}
            </div>
        </div>
    )
}

export default Product;