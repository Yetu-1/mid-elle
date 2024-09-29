import { Route, Routes } from 'react-router-dom'
import { ProductPage } from './screens/ProductPage'
import { HomePage } from './screens/HomePage'
import { SearchPage } from './screens/SearchPage'
import { SignUpPage } from './screens/SignUpPage'
import { LoginPage } from './screens/LoginPage'
import { NavBar } from './components/NavBar'
import { AddProductPage } from './screens/AddProductPage'
import { CartPage } from './screens/CartPage'
import { OrdersPage } from './screens/OrdersPage'
import './App.css'

function App() {

  return (
    <div className='my-container'>
      <Routes>
        <Route path='/' element={
          <div className='my-container'>
            <NavBar />
            <HomePage />
          </div>
        }/>
        <Route path='/login' element={
          <div className='my-container'>
            <NavBar />
            <LoginPage />
          </div>
        }/>
        <Route path='/signup' element={
          <div className='my-container'>
            <NavBar />
            <SignUpPage />
          </div>
        }/>
        <Route path='/rings' element={
          <div className='my-container'>
            <NavBar />
            <SearchPage page="ring"/>
          </div>
        }/>
        <Route path='/necklaces' element={
          <div className='my-container'>
            <NavBar />
            <SearchPage page="necklace"/>
          </div>
        }/>
        <Route path='/bracelets' element={
          <div className='my-container'>
            <NavBar />
            <SearchPage page="bracelet"/>
          </div>
        }/>
        <Route path='/earrings' element={
          <div className='my-container'>
            <NavBar />
            <SearchPage page="earrings" />
          </div>
        }/>
        <Route path='/giftboxes' element={
          <div className='my-container'>
            <NavBar />
            <OrdersPage />
          </div>
        }/>
        <Route path='/product/:id' element={
          <div className='my-container'>
            <NavBar />
            <ProductPage />
          </div>
        }/>

        <Route path='/cart' element={
          <div className='my-container'>
            <NavBar />
            <CartPage />
          </div>
        }/>

        <Route path='/orders' element={
          <div className='my-container'>
            <NavBar />
            <OrdersPage />
          </div>
        }/>

        <Route path='/addproduct' element={
          <div className='my-container'>
            <NavBar />
            <AddProductPage />
          </div>
        }/>

        <Route path='*' element={
          <div className='my-container'>
            <NavBar />
            <HomePage />
          </div>
        }/>
      </Routes>
    </div>
  )
}

export default App
