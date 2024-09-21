import { Route, Routes } from 'react-router-dom'
import { ProductPage } from './screens/ProductPage'
import { HomePage } from './screens/HomePage'
import { SearchPage } from './screens/SearchPage'
import { SignUpPage } from './screens/SignUpPage'
import { LoginPage } from './screens/LoginPage'
import { NavBar } from './components/NavBar'
import { AddProductPage } from './screens/AddProductPage'
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <div className='container'>
            <NavBar />
            <HomePage />
          </div>
        }/>
        <Route path='/login' element={
          <div className='container'>
            <NavBar />
            <LoginPage />
          </div>
        }/>
        <Route path='/signup' element={
          <div className='container'>
            <NavBar />
            <SignUpPage />
          </div>
        }/>
        <Route path='/rings' element={
          <div className='container'>
            <NavBar />
            <SearchPage page="ring"/>
          </div>
        }/>
        <Route path='/necklaces' element={
          <div className='container'>
            <NavBar />
            <SearchPage page="necklace"/>
          </div>
        }/>
        <Route path='/bracelets' element={
          <div className='container'>
            <NavBar />
            <SearchPage page="bracelet"/>
          </div>
        }/>
        <Route path='/earrings' element={
          <div className='container'>
            <NavBar />
            <SearchPage page="earrings" />
          </div>
        }/>
        <Route path='/giftboxes' element={
          <div className='container'>
            <NavBar />
            <AddProductPage />
          </div>
        }/>
        <Route path='/product/:id' element={
          <div className='container'>
            <NavBar />
            <ProductPage />
          </div>
        }/>
        <Route path='*' element={
          <div className='container'>
            <NavBar />
            <HomePage />
          </div>
        }/>
      </Routes>
    </div>
  )
}

export default App
