import React,{useState} from "react";
import { Link } from "react-router-dom";
import { auth, fs } from "./Config/Config";
import {useNavigate} from 'react-router-dom'
import { Navbar } from "./Navbar";

export const Login = () => {

    const navigate = useNavigate();

   

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    //Creo la funcion para cuando el usuario se registre
const handleLogin = (e) => {
    e.preventDefault()
    //console.log(email,password)

    auth.signInWithEmailAndPassword(email,password).then(()=>{
        setSuccessMsg('¡¡Bienvenido a la página!!');
        setEmail('');
        setPassword('');
        setErrorMsg('');
        setTimeout(()=> {
              setSuccessMsg ('');
               navigate('/');
            },2000)

    }).catch(error=>setErrorMsg('Correo o contraseña incorrecta'));

}

return (
    <>
    <Navbar/>
    <div className='container-login'>
       
    <h1> Inicia Sesión </h1>
    <hr></hr>
    {successMsg &&
       <>
        <div className='success-msg' > {successMsg} </div>
       </>
       }

    <form className= 'form-group' autoComplete="off" onSubmit={handleLogin}>
         
         <label> Correo electrónico </label>
         <input type="email" className='form-control' required placeholder="Ponga su correo" style={{width:"330px"}} onChange={(e)=> setEmail(e.target.value)}
             value={email}></input>
         
         <label> Contraseña </label>
         <input type="password" className='form-control' required placeholder="Ponga su contraseña" style={{width:"330px"}} onChange={(e)=> setPassword(e.target.value)}
             value={password}></input>
         
         <div className='btn-box'> 
             <span> ¿No tienes cuenta?
                 <Link to="/signup" className="link"> ¡Regístrate! </Link>
             </span>
         </div>
         <div>
         <button type="submit" className="btn btn-success btn-md" style={{backgroundColor:"black"}}> Entrar </button>
         
         </div>
    </form>
    

    {errorMsg &&
       <>
       <br></br>
        <div className='error-msg'>{errorMsg}</div>
       
       </>
       
       }
 </div>
 </>
)

}