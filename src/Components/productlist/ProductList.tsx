import { useEffect, useState } from 'react';
import { products } from '../../utils';
import { ProductProps } from '../products/Products';
import './productList.scss';
import Product from '../product/Product';
import Navbar from '../navbar/Navbar';
import ReactPaginate from 'react-paginate';




const ProductList = () => {
    const [data, setData] = useState<ProductProps[]>([])

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        products().then(res => setData(res))
    }, [])

    return (
        <>
            <Navbar />
            <div className='list'>
                {
                    currentItems.map((item) => (
                        <Product items={item} />
                    ))
                }
            </div>
            <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    containerClassName='pagination'
                    pageClassName='page-num'
                    previousLinkClassName='previous'
                    nextLinkClassName='previous'
                    activeLinkClassName='active'
                />
        </>
    )
}

export default ProductList;