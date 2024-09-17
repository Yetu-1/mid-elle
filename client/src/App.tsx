import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { MyNavLink } from './components/MyNavLink'
import { Link } from 'react-router-dom'
import { Product } from './components/Product'
import cartIcon from "./assets/icon-cart.svg"
import { Home } from './components/Home'
import { Search } from './components/Search'
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
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
        <Route path='/login' element={
          <div className='container'>
            <NavBar />
            <Login />
          </div>
        }/>
        <Route path='/signup' element={
          <div className='container'>
            <NavBar />
            <SignUp />
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
        <Route path='/product/:id' element={
          <div className='container'>
            <NavBar />
            <Product />
          </div>
        }/>
        <Route path='*' element={
          <div className='container'>
            <NavBar />
            <Home />
          </div>
        }/>
      </Routes>
    </div>
  )
}

function NavBar() {
  return (
    <div className='nav-bar'>
      <div className='nav-1'>
        <Link to="/" id="logo">MID-ELLE</Link>
        <MyNavLink />     
      </div>

      <div className='nav-list'>
        <div id="search-button">
          <img src="/search.svg" alt="profile image" style={{width: "35px"}}/>
        </div>
        {/* <div id="avatar">
          <img src="/image-avatar.png" alt="avater image" />
        </div> */}
        <UserRegButton />
        <div id="cart">
          <img src={cartIcon}  alt="cart icon" />
        </div>
        {/* <div id="profile">
          <img src="/icon-profile.svg" alt="profile image" style={{width: "33px"}}/>
        </div> */}
      </div>
    </div>
  )
}

function UserRegButton() {
  return (
    <div className="profile-button">
      <div>
        <img src="/icon-profile.svg" alt="profile image" style={{width: "33px"}}/>
      </div>

      <div id="dropdown">
        <NavLink to="/login"><p className="dropdown-button">LOG IN</p></NavLink>
        <NavLink to="/signup"><p className="dropdown-button">SIGN UP</p></NavLink>
      </div>
    </div>
  )
}

export default App
