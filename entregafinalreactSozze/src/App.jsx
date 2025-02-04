/*import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import PageNotFound from './components/PageNotFound/PageNotFound';
import { CartContextProvider } from './contex/CartContex';


function App() {
  
  return (
    <ChakraProvider>
      <CartContextProvider>
         <BrowserRouter>
      <NavBar />
          <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/categorias/:categoryId' element={<ItemListContainer title={'Tienda'}/>}/>
        <Route path='/producto/:productId' element ={<ItemDetailContainer/>}/>
       <Route path='*' element ={<PageNotFound/>}/>
        </Routes>
       </BrowserRouter>
       </CartContextProvider>
      </ChakraProvider>

)
}

export default App*/

import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider, Flex } from '@chakra-ui/react'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import PageNotFound from './components/PageNotFound/PageNotFound';
import { CartContextProvider } from '../src/context/CartContex';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
function App() {


  return (
    <ChakraProvider>
      <CartContextProvider>
        <BrowserRouter >
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer title={'Tienda'} texto='soy un texto desde app'/>}/>
            <Route path='/categorias/:categoryId'element={<ItemListContainer title={'Tienda'} />}/>
            <Route path='/producto/:productId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </ChakraProvider>

  )
}

export default App
