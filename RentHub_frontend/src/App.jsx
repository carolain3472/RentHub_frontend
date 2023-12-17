import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import {Land_page} from './pages/land_page'
import {About_us_page} from './pages/about_us_page'
import {Contact_us_page} from './pages/contact_us_page'

import { Login_page } from './pages/login_page'
import { Register_page } from './pages/register_page'
import { Pagina_inicial_page } from './pages/pagina_inicial_page'
import {ConfiguracionPage} from './pages/configuracion_page'
import { Objetos_usuario_page } from './pages/objetos_usuario_page'
import { Objetos_arrendados_page } from './pages/objetos_arrendados'
import { Objetos_adquiridos_page } from './pages/objetos_adquiridos'
import { Boton_pago_page } from './pages/Boton_pago_page'
import { Message_user } from './pages/message_user'


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
      <Route path='/objetos_arrendamiento' element ={<Pagina_inicial_page/>} />
      <Route path='/configuracion_perfil' element ={<ConfiguracionPage/>} />
      <Route path='/objetos_propiertario' element ={<Objetos_usuario_page/>} />
      <Route path='/objetos_arrendados' element ={<Objetos_arrendados_page/>} />
      <Route path='/objetos_adquiridos' element ={<Objetos_adquiridos_page/>} />

      <Route path='/pagar-arrendamiento' element ={<Boton_pago_page/>} />

      <Route path='/mensajes_usuario' element ={<Message_user/>} />
      
      

    
    </Routes>

  </BrowserRouter>
  )
}

export default App