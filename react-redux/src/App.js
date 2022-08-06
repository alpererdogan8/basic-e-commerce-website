import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ListCart from './pages/ListCart'
import MyCart from './pages/MyCart'
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './components/Register'
import Login from './components/Login'
import PrivateRoutes from './components/PrivateRoutes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncAuthUserAPI } from './features/auth/authAPI'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncAuthUserAPI())
  }, [dispatch])

  return (
    <div className="font-albert font-semibold">
      <Navbar />

      <Routes>
        <Route path="/" element={<ListCart />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/my-cart" element={<MyCart />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position={'bottom-right'}
        autoClose={750}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="dark"
      />
    </div>
  )
}

export default App
