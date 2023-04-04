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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toast } from 'react-toastify';
import { fetchProducts } from '../../redux/slices/fetchProductsSlice';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;
}

interface ProductState {
    isLoading: boolean;
    products: ProductProps[];
    isError: boolean
}


const ProductList = () => {
    const [data, setData] = useState<ProductState[]>([])
    const [category, setCategory] = useState<ProductProps[]>([])
    const location = useLocation()
    const [inputSearch, setInputSearch] = useState('')
    const [searchItem, setSearchItem] = useState<ProductProps[]>([])
    const [view, setView] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const user = useAppSelector((state) => state.user.user.accessToken)
    const router = useNavigate()
    const dispatch = useAppDispatch()


    const productsData = useAppSelector((state) => state.productsData.products)


    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 9;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = productsData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(productsData.length / itemsPerPage);


    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % productsData.length;
        setItemOffset(newOffset);
        return window.scrollTo({top: 0, behavior: "smooth"})
    };

    const handle = async (id: string) => {
        const res = await axios.get(`https://dummyjson.com/products/category/${id}`)
        setCategory(res.data.products)
    }



    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputSearch(e.target.value.toLowerCase())
    //     const filteredData = data.filter((item) => {
    //         return item.title.toLowerCase().includes(inputSearch);
    //     });
    //     setSearchItem(filteredData);
    // }

    // const handleEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    //     if (e.key === 'Enter') {
    //         handleSearch(e)
    //     }
    // }

    const viewAll = () => {
        setView(true)
        setCategory([])
    }





    // useEffect(() => {
    //     products().then(res => setData(res))
    // }, [])




    const fetchData = () => {
        return dispatch(fetchProducts())
    }



    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (!user) {
            router('/login', { state: { message: "Please login first " } })
        }
    }, [user])


    // useEffect(() => {
    //     window.addEventListener('scroll', scrollPosition )

    //     return () => window.removeEventListener('scroll',scrollPosition)
    // },[])


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
                {/* onChange={handleSearch} */}
                    <div className="search" >
                        <input type="text" placeholder='Search product...' value={inputSearch} />
                    </div>
                    <div className='list'>
                        {/* {
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
                        } */}
                        {
                            currentItems.map((item) => (
                                <>
                                    <Product items={item} />
                                </>
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
                </div>
            </div>
        </>
    )
}

export default ProductList;