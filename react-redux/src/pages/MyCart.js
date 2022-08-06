import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../components/Cart'
import CartBuy from '../components/CartBuy'
import Modal from '../components/Modal'
import { loadMyCartState } from '../features/carts/cartSlice'

const MyCart = () => {
  const myCartViewData = useSelector((state) => state.cart.myCart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMyCartState({ cart: 'cart', total: 'total' }))
  }, [dispatch])

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2  mx-auto">
        {/* ListCart <br /> */}
        <div className="flex flex-wrap  justify-center -m-4">
          {myCartViewData.data.length !== 0 ? (
            myCartViewData.data &&
            myCartViewData.data.map((item) => (
              <Cart
                _id={item._id}
                key={item._id}
                img={item.img}
                productName={item.productName}
                price={item.price}
                cartState={'delete'}
              />
            ))
          ) : (
            <h1 className="mt-[37vh] text-6xl font-semibold">Empty</h1>
          )}
        </div>
      </div>
      <CartBuy itemPrice={myCartViewData.totalPrice} />
      <Modal />
    </section>
  )
}

export default MyCart
