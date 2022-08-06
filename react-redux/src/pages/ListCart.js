import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncAPI } from '../features/carts/cartAPI'
import Cart from '../components/Cart'

const ListCart = () => {
  const cartViewData = useSelector((state) => state.cart.cartList)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncAPI('products'))
  }, [dispatch])
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2  mx-auto">
        <div className="flex flex-wrap  justify-center -m-4">
          {!cartViewData.loading ? (
            cartViewData.data[0] &&
            cartViewData.data[0].map((item) => (
              <Cart
                key={item._id}
                _id={item._id}
                img={item.img}
                productName={item.productName}
                price={item.price}
                cartState={'add'}
              />
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </section>
  )
}

export default ListCart
