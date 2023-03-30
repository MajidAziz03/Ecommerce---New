import { useEffect, useRef, useState } from 'react';
import { products } from '../../utils';
import './productList.scss';
import Product from '../product/Product';
import Navbar from '../navbar/Navbar';
import ReactPaginate from 'react-paginate';
import { lists } from '../../lists';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SearchOffOutlined } from '@mui/icons-material';
import { useAppSelector } from '../../redux/hooks';
import { toast } from 'react-toastify';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;
}


const ProductList = () => {
    const [data, setData] = useState<ProductProps[]>([])

    const [category, setCategory] = useState<ProductProps[]>([])
    const location = useLocation()
    const [inputSearch, setInputSearch] = useState('')
    const [searchItem, setSearchItem] = useState<ProductProps[]>([])
    const [view, setView] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const user = useAppSelector((state) => state.user.user.accessToken)
    const router = useNavigate()



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



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearch(e.target.value.toLowerCase())
        const filteredData = data.filter((item) => {
            return item.title.toLowerCase().includes(inputSearch);
        });
        setSearchItem(filteredData);
    }

    // const handleEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    //     if (e.key === 'Enter') {
    //         handleSearch(e)
    //     }
    // }

    const viewAll = () => {
        setView(true)
        setCategory([])
    }


    useEffect(() => {
        products().then(res => setData(res))
    }, [])

    useEffect(() => {
        if(!user) {
            router('/login', {state : {message : "Please login first "}})
        }
    }, [user])

    return (
        <>
            <Navbar />
            <div className="productsHolder">
                <div className="left">
                    <ul>
                        <li onClick={viewAll}>View All</li>
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
                    <div className="search" >
                        <input type="text" placeholder='Search product...' onChange={handleSearch} value={inputSearch} />
                    </div>
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
                                    view
                                        ?
                                        (
                                            currentItems.map((item) => (
                                                <Product items={item} />
                                            ))
                                        )
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