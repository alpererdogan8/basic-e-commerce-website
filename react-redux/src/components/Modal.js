import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalIsOpen } from '../features/carts/cartSlice'

const Modal = () => {
  const modalBool = useSelector((state) => state.cart.modal)
  const dispatch = useDispatch()
  return (
    <div
      className={`${
        modalBool ? 'block' : 'hidden'
      }  z-10 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#363636c4] `}
    >
      <div
        className="z-20 absolute top-0 bottom-0 left-0 right-0"
        onClick={() => dispatch(modalIsOpen(!modalBool))}
      ></div>
      <div className="z-30 absolute top-[8%] bottom-[8%] left-[20%] right-[20%] bg-green-300 text-white ">Modal</div>
    </div>
  )
}

export default Modal
