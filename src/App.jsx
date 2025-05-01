import React from 'react';
import { Route, Routes } from 'react-router';
import Product from './Pages/Product';
import Products from './Pages/Products';
import Main from './Pages/Main';
import Todo from './Pages/Todo';


function App() {
  return(
    <>
      <Routes>
        <Route path='/' element = {<Main/>}/>
        <Route path='/products' element = {<Products/>}/>
        <Route path='/todo' element = {<Todo/>}/>
        <Route path='/product/:id' element = {<Product/>}/>
      </Routes>
    </>
  )
  }
export default App;