/* eslint-disable array-callback-return */
import { asyncAPI } from './cartAPI'
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartList: { data: [], loading: false },
  myCart: { data: [], totalPrice: 0 },
  modal: false,
  isAuth: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.myCart.data.find((item) => item._id === action.payload)) {
        return toast.info('You have already added')()
      } else {
        const findItem = state.cartList.data[0].find((item) => item._id === action.payload)

        const amount = Number(state.myCart.totalPrice) + Number(findItem.price)
        toast.success('Product added')
        localStorage.setItem('cart', JSON.stringify([...state.myCart.data, findItem]))
        localStorage.setItem('total', amount.toFixed(2))
        return {
          ...state,
          myCart: {
            data: [...state.myCart.data, findItem],
            totalPrice: amount.toFixed(2)
          }
        }
      }
    },
    deleteToCart: (state, action) => {
      const deletedItemPrice = state.myCart.data.find((item) => item._id === action.payload)
      const amount = state.myCart.totalPrice - Number(deletedItemPrice.price) * Number(deletedItemPrice.quantity)
      toast.error('Product Deleted')
      localStorage.setItem('cart', JSON.stringify(state.myCart.data.filter((item) => item._id !== action.payload)))
      localStorage.removeItem('total')
      localStorage.setItem('total', amount.toFixed(2))
      return {
        ...state,
        myCart: {
          data: state.myCart.data.filter((item) => item._id !== action.payload),
          totalPrice: amount.toFixed(2)
        }
      }
    },
    increaseDecreaseQuantity: (state, action) => {
      const myCartPrice = Number(state.myCart.totalPrice)
      state.myCart.data.map((item) => {
        if (item._id === action.payload._id) {
          if (item.quantity < 2) {
            state.myCart.totalPrice = myCartPrice - item.price
          }
          item.quantity = action.payload.value
          if (action.payload.quantityCase === 'increase') {
            state.myCart.totalPrice = (myCartPrice + item.price).toFixed(2)
          } else if (action.payload.quantityCase === 'decrease' && myCartPrice > 0) {
            state.myCart.totalPrice = (myCartPrice - item.price).toFixed(2)
          } else {
            console.error('Not defined is increment')
          }
          return item
        }
      })
    },

    modalIsOpen: (state, action) => {
      return {
        ...state,
        modal: action.payload
      }
    },
    loadMyCartState: (state, action) => {
      const dataCart = localStorage.getItem(action.payload.cart)
      const cartTotal = localStorage.getItem(action.payload.total)
      if (!dataCart) return {}
      return {
        ...state,
        myCart: {
          data: JSON.parse(dataCart),
          totalPrice: cartTotal
        }
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(asyncAPI.pending, (state) => {
        state.cartList.loading = true
      })
      .addCase(asyncAPI.fulfilled, (state, action) => {
        state.cartList.loading = false
        state.cartList.data.pop()
        state.cartList.data.push(action.payload)
      })
  }
})

export const { addToCart, deleteToCart, increaseDecreaseQuantity, modalIsOpen, loadMyCartState } = cartSlice.actions
export default cartSlice.reducer
