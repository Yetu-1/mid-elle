import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MyNavLink } from './components/MyNavLink'
import { Link } from 'react-router-dom'
import { Product } from './components/Product'
import cartIcon from "./assets/icon-cart.svg"
import { Home } from './components/Home'
import { Search } from './Search'
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <div className='container'>
            <NavBar />
            <Home />
          </div>
        }/>
        <Route path='/rings' element={
          <div className='container'>
            <NavBar />
            <Search />
          </div>
        }/>
        <Route path='/necklaces' element={
          <div className='container'>
            <NavBar />
            <Search />
          </div>
        }/>
        <Route path='/bracelets' element={
          <div className='container'>
            <NavBar />
            <Search />
          </div>
        }/>
        <Route path='/earrings' element={
          <div className='container'>
            <NavBar />
            <Search />
          </div>
        }/>
        <Route path='/giftboxes' element={
          <div className='container'>
            <NavBar />
            <Product />
          </div>
        }/>
      </Routes>
    </div>
  )
}

function NavBar () {
  return (
    <div className='nav-bar'>
      <div className='nav-1'>
        <Link to="/" id="logo">MID-ELLE</Link>
        <MyNavLink />     
      </div>

      <div className='nav-list'>
        <div id="cart">
          <img src={cartIcon}  alt="cart icon" />
        </div>
        <div id="profile">
          <img src="icon-profile.svg" alt="profile image" style={{width: "30px"}}/>
        </div>
        <div id="avatar">
          <img src="image-avatar.png" alt="avater image" />
        </div>
      </div>
    </div>
  )
}

function Cart () {
  return (
    <div className="cart-dialog">

    </div>
  )
}

export default App
