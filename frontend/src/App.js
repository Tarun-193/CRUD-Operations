import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/pages/Login';
import Register from './components/pages/Registration';
import Update from './components/pages/Update';
import Home from './components/pages/Home';
import NewRegistration from './components/pages/NewRegistration';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/newregister' element={<NewRegistration />} />
      <Route path='/Register' element={<Register/>} />
      <Route path='/Update/:id' element={<Update />} />
    </Routes>
  </BrowserRouter>
)

export default App 