import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncAuthLogoutAPI } from '../features/auth/authAPI'
import { Notfication } from './Notification'

const Nav = () => {
  const cartViewData = useSelector((state) => state.cart.myCart)
  const auth = useSelector((state) => state.auth)
  const notificationTotal = cartViewData.data.length

  const dispatch = useDispatch()

  return (
    <div className="bg-black flex justify-between items-center px-12 py-2 drop-shadow-lg sticky top-0 z-10 ">
      <ul className=" flex justify-center align-middle text-white w-auto h-auto">
        <li className=" mx-10 flex items-center  leading-loose hover:underline ">
          <Link to="/">Home</Link>
        </li>
        <li className="text-white mx-10 flex items-center  leading-loose hover:underline">
          <Link to="/my-cart">My Cart</Link>
        </li>
        <li>
          {!auth.isLogin ? (
            <Link className="text-white mx-10 flex items-center  leading-loose hover:underline" to="/login">
              Login
            </Link>
          ) : (
            <Link
              className="text-white mx-10 flex items-center  leading-loose hover:underline"
              to="/"
              onClick={() => dispatch(asyncAuthLogoutAPI())}
            >
              Logout
            </Link>
          )}
        </li>
      </ul>
      <Notfication total={notificationTotal} />
    </div>
  )
}

export default Nav
