/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, deleteToCart, increaseDecreaseQuantity } from '../features/carts/cartSlice'

const Cart = ({ _id, img, productName, price, cartState }) => {
  const dispatch = useDispatch()

  const handleClick = (_id) => {
    cartState === 'add' ? dispatch(addToCart(_id)) : dispatch(deleteToCart(_id))
  }

  return (
    <div className=" mx-1 lg:w-1/4 md:w-1/2 p-4 w-full shadow-base border-gray-200 border-solid border-[2px] rounded-md my-11">
      <div className="flex justify-between">
        <h2 className="text-gray-900 title-font text-lg font-medium">{productName}</h2>
        <p className=" font-bold  ">${price}</p>
      </div>
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt={productName}
          className="object-scale-down object-center w-full h-full block"
          src={`http://localhost:8000${img}`}
        />
      </a>
      <div className={`mt-5 flex ${cartState === 'add' ? 'justify-center' : 'justify-between items-center'}`}>
        <button
          className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg"
          onClick={() => handleClick(_id)}
        >
          {cartState === 'add' ? <p>Add Cart</p> : <p>Remove Cart</p>}{' '}
        </button>
        {cartState === 'add' ? null : <InAndDecreaseBtn dispatch={dispatch} _id={_id} />}
      </div>
    </div>
  )
}

//increase and decrease function
const InAndDecreaseBtn = ({ dispatch, _id }) => {
  const quantityData = useSelector((state) => state.cart.myCart)
  const quantityValue = quantityData.data.find((item) => item._id === _id)
  const [value, setValue] = useState(quantityValue.quantity)
  const [quantityCase, setQuantityCase] = useState('default')
  useEffect(() => {
    if (quantityCase !== 'default') {
      dispatch(increaseDecreaseQuantity({ value, _id, quantityCase }))
    }
  }, [value, _id, quantityCase, dispatch])

  const handleClickIncreaseAndDecreaseBtn = (state) => {
    if (state === '+') {
      setValue(value + 1)
      setQuantityCase('increase')
    }
    if (state === '-') {
      setValue(value <= 1 ? 1 : value - 1)
      setQuantityCase('decrease')
    }
  }
  return (
    <span className=" flex justify-center items-center">
      <button
        className="bg-black text-white py-[6px] px-2.5 font-semibold rounded text-xl"
        onClick={() => handleClickIncreaseAndDecreaseBtn('+')}
      >
        +
      </button>
      <input
        id="quantityInput"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="text-black text-xl font-semibold min-w-[0.60rem] max-w-[2.85rem] pl-[0.90rem] outline-none "
      />
      <button
        className="bg-black text-white py-[6px] px-2.5 font-semibold rounded text-xl"
        onClick={() => handleClickIncreaseAndDecreaseBtn('-')}
      >
        -
      </button>
    </span>
  )
}

export default Cart
