import './check.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { decrement, increament, InitialStateProps, remove } from '../../redux/slices/productSlice';
import { Add, PlusOne, Remove } from '@mui/icons-material';


const Check = () => {

  const cartData = useAppSelector((state) => state.product.items)
  // const cartQuantity = useAppSelector((state) => state.product.quantity)
  const cartTotal = useAppSelector((state) => state.product.total)
  const dispatch = useAppDispatch()

  const handleRemove = (id: number) => {
    dispatch(remove(id))
  }

  const inr = (id: number) => {
    dispatch(increament(id))
  }

  const dec = () => {
    dispatch(decrement())
  }

  return (
    <>
      <table>
        <tr>
          <th>Product Details</th>
          <th> Quantity</th>
          <th> Price </th>
          <th> Total </th>
        </tr>
        {
          cartData.map((item) => (
            <>
              <tr>
                <td>
                  <div className='holder'>
                    <img src={item.thumbnail} alt="" />
                    <div className="info">
                      <h3>{item.title} </h3>
                      <span> {item.brand} </span>
                      <small className='remove' onClick={() => handleRemove(item.id)}> Remove</small>
                    </div>
                  </div>
                </td>
                <td>
                  {/* <span className="quantity">{cartQuantity}</span> */}
                  <div className="incr">
                    <Remove sx={{ cursor: "pointer" }} onClick={dec} />
                    <span className="quan">
                      {item.quantity}
                    </span>
                    <Add sx={{ cursor: "pointer" }} onClick={() => inr(item.id)} />
                  </div>
                </td>
                <td><span className="price">${item.price} </span></td>
                {/* <td> <span className="total"> ${cartTotal} </span>  </td> */}
              </tr>
            </>
          ))
        }
      </table>
    </>
  )
}

export default Check