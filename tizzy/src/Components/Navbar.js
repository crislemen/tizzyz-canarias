import React from "react";
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import { auth } from "./Config/Config"
import {useNavigate} from 'react-router-dom'
import {users} from 'react-icons-kit/feather/users'
import {mail} from 'react-icons-kit/feather/mail'
import {AddProducts} from './AddProducts'



 //el props de totalProducts es de el iconito pequeño del carrito cuando añado un producto, que se lo paso de la Home 
export const Navbar = ({user,totalProducts}) => {

    
    const navigate = useNavigate();

        const handleLogout =()=>{
        auth.signOut().then(()=> {
            navigate('/login')
        })
        }
return (
    <>
    <div className='navbar'>
    
    {user && user!="cristian" &&
        <>
        
        <div className='leftside'>
            <div className='logo' id="volver">
            <img src={logo} style={{width: '50px'}} alt="logo"/>
            </div>
        </div>
        </>
    }
        <div className='rightside'> 
        
        {!user && 
        <>
         <div className='leftside'>
            <div className='logo' id="volver">
            <img src={logo} style={{width: '50px'}} alt="logo"/>
                
            </div>
            </div>
            <div><Link className="navlink" to = "/" style={{marginRight: '170px'}}> Volver al Inicio  </Link></div>
            <div> <Link className="navlink" to = "/contacto"> <Icon icon={mail} size={20}/> Contacto </Link> </div>
            <div> <Link className='navlink' to= "/signup" > Registrarse </Link></div>
            <div> <Link className='navlink' to= "/login" > Inicia sesión </Link></div>

           
        
        </>}
        {user && user!="cristian" &&
        <>
        <div><Link className="navlink" to = "/" style={{marginRight: '170px'}}> ¡Hola {user}!
                <Icon icon={users} size={20}/>  volver al Inicio  </Link></div>
            <div> <Link className="navlink" to = "/contacto"> <Icon icon={mail} size={20}/> Contacto </Link> </div>
        
        <div className="cart-menu-btn">
            <Link className='navlink' to="/carrito">
                <Icon icon={shoppingCart} size={20}/>
            </Link>
            <span className="cart-indicator">{totalProducts}</span>
        </div>
        <div className= 'btn btn-danger btn-md' onClick={handleLogout}> Cerrar Sesión </div>
        </>
        }
    
        </div>

    </div>

    {user && user=="cristian" &&
        <>
        <div className='rightside'> 
        <AddProducts></AddProducts>
        <div className='navbar'>
        <div className='leftside'>
            <div className='logo' id="volver">
            <img src={logo} alt="logo" style={{width: '50px'}}/>
                
            </div>
        </div>

        <div> ¡Hola admin! </div>
                
        <div className= 'btn btn-danger btn-md' onClick={handleLogout}> Cerrar Sesión </div>
        </div>
        </div>
        </>

    } 
    </>
)

}