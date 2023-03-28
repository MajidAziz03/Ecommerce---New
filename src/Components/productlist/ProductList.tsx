import { useEffect, useRef, useState } from 'react';
import { products } from '../../utils';
import { ProductProps } from '../products/Products';
import './productList.scss';
import Product from '../product/Product';
import Navbar from '../navbar/Navbar';
import ReactPaginate from 'react-paginate';
import { lists } from '../../lists';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Search, SearchOffOutlined } from '@mui/icons-material';


const ProductList = () => {
    const [data, setData] = useState<ProductProps[]>([])

    const [category, setCategory] = useState<ProductProps[]>([])
    const location = useLocation()
    const [inputSearch, setInputSearch] = useState('')
    const [searchItem, setSearchItem] = useState<ProductProps[]>([])
    const inputRef = useRef<HTMLInputElement>(null)



    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 9;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);


    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    const handle = async (id: string) => {
        const res = await axios.get(`https://dummyjson.com/products/category/${id}`)
        setCategory(res.data.products)
    }

    // const handleSearch = () => {
    //     if (inputRef.current) {
    //         setInputSearch(inputRef.current.value.toLowerCase());
    //     }
    //     const filteredData = data.filter((item: ProductProps) => {
    //         return item.title.toLowerCase().includes(inputSearch);
    //     });

    //     setSearchItem(filteredData);
    // };


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputRef.current) {
            setInputSearch(inputRef.current.value.toLowerCase());
        }
        const filteredData = data.filter((item) => {
            return item.title.toLowerCase().includes(inputSearch);
        });
        setSearchItem(filteredData);
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            handleSearch(e)
        }
    }


    useEffect(() => {
        products().then(res => setData(res))
    }, [])


    return (
        <>
            <Navbar />
            <div className="productsHolder">
                <div className="left">
                    <ul>
                        <li>View All</li>
                        {
                            lists.map((item) => (
                                <>
                                    <li onClick={() => handle(item)}>{item}</li>
                                </>
                            ))
                        }
                    </ul>
                </div>
                
                <div className="right">
                    <form className="search" onSubmit={handleSearch} onKeyDown={handleEnter} >
                        <input type="text" placeholder='Search product...' ref={inputRef} />
                        <button className='btn'>
                            <Search className='sear' />
                        </button>
                    </form>
                    <div className='list'>
                        {
                            category.length > 0
                                ?
                                (
                                    category.map((item) => (
                                        <>
                                            <Product items={item} />
                                        </>
                                    ))
                                )
                                :
                                searchItem.length > 0
                                    ?
                                    searchItem.map((item) => (
                                        <>
                                            <Product items={item} />
                                        </>
                                    ))
                                    :
                                    (
                                        currentItems.map((item) => (
                                            <Product items={item} />
                                        ))
                                    )
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
                </div>
            </div>
        </>
    )
}

export default ProductList;