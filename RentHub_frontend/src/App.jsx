import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import {Land_page} from './pages/land_page'
import {About_us_page} from './pages/about_us_page'
import {Contact_us_page} from './pages/contact_us_page'

import { Login_page } from './pages/login_page'
import { Register_page } from './pages/register_page'

/**Como crear rutas  
 * Importacion
 * import { Login_template } from './pages/Login_template'
 * Implementación
 * <Route path='/login' element ={<Login_template/>} />  
 * */  


function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/login' element ={<Login_page/>} />
      <Route path='/register' element ={<Register_page/>} />
      <Route path='/' element ={<Land_page/>} />
      <Route path='/about-us' element ={<About_us_page/>} />
      <Route path='/contact-us' element ={<Contact_us_page/>} />
    </Routes>

  </BrowserRouter>
  )
}

export default App