import { Route, Routes } from 'react-router-dom'
import { Product } from './screens/Product'
import { Home } from './screens/Home'
import { Search } from './screens/Search'
import { SignUp } from './screens/SignUp'
import { Login } from './screens/Login'
import { NavBar } from './components/NavBar'
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

export default App
