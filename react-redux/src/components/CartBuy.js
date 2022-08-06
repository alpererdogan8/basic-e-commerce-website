import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalIsOpen } from '../features/carts/cartSlice'

const CartBuy = ({ itemPrice }) => {
  const dispatch = useDispatch()
  const { modal, myCart } = useSelector((state) => state.cart)
  const emptyCart = myCart.data.length === 0 ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-400'
  const disabledCart = myCart.data.length === 0 ? true : false
  return (
    <div className="bg-black text-white flex justify-between items-center px-12 py-2 drop-shadow-lg fixed bottom-0 z-10 w-[100%]">
      <p className="text-2xl text-center">Total Price: ${itemPrice}</p>
      <div>
        <button
          onClick={() => dispatch(modalIsOpen(!modal))}
          className={`${emptyCart} text-white border-0 py-2 px-8 focus:outline-none  rounded text-lg `}
          disabled={disabledCart}
        >
          Select Payment Method
        </button>
      </div>
    </div>
  )
}

export default CartBuy
