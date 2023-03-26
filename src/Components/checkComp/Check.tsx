import './check.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { InitialStateProps, remove } from '../../redux/slices/productSlice';


const Check = () => {

  const cartData = useAppSelector((state) => state.product.items)
  const cartQuantity = useAppSelector((state) => state.product.quantity)
  const cartTotal = useAppSelector((state) => state.product.total)
  const dispatch = useAppDispatch()

  const handleRemove = (id: number) => {
    dispatch(remove(id))
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
                  <span className="quantity">{cartQuantity}</span>
                </td>
                <td><span className="price">${item.price} </span></td>
                <td> <span className="total">$2322</span>  </td>
              </tr>
            </>
          ))
        }
      </table>
    </>
  )
}

export default Check