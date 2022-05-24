import React,{useState} from "react";
import { Link } from "react-router-dom";
import { auth, fs } from "./Config/Config";
import {useNavigate} from 'react-router-dom';
import { Navbar } from "./Navbar";


export const Signup = () => {

    const navigate = useNavigate();
//los estados que voy a coger y cambiar dependiendo de mis inputs con los props. 
    const [fullName, setFullname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    
//Creo la funcion para cuando el usuario se registre, aqui creo el usuario en mi bd
const handleSignup = (e) => {
    e.preventDefault()
    //console.log(fullName,email,password)
    //hago la utentificacion con firebase, y creo una promesa para cuando esté bien crear los usuarios en mi bd
    //y si da error, me sale mensaje de error 
    auth.createUserWithEmailAndPassword(email,password).then((credentials) => {
        console.log('credencialessss',credentials); 
        fs.collection('users').doc(credentials.user.uid).set( {
            Fullname: fullName,
            Email: email,
            Password: password
        }).then (()=> {
            setSuccessMsg('¡Genial!, ahora inicia sesión.');
            //inicializo de nuevo todos mis estados para otro usuario 
            setFullname('');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=> {
                    setSuccessMsg ('');
                    navigate('/login');
            },2000)
        }).catch(error=>setErrorMsg('Algo está mal, comprúebe que su contraseña tenga minimo 6 carácteres o prueba otro correo'));
    }).catch((error)=> {
        setErrorMsg('Algo está mal, comprúebe que su contraseña tenga minimo 6 carácteres o prueba otro correo')
    })
}

return (
    <>
    <Navbar/>
    <div className='container-login'>
       
       <h1> Regístrate</h1>
       <hr></hr>

       {/*escribimos el mensaje si da true*/}
       {successMsg &&
       <>
        <div className='success-msg'> {successMsg} </div>
       </>
       }
       <form className= 'form-group' autoComplete="off" onSubmit={handleSignup}>
            <label> Nombre completo</label>
            <input type="text" className='form-control' required placeholder="Ponga su nombre completo" style={{width:"330px"}}  onChange={(e)=> setFullname(e.target.value)}
             value={fullName}></input>
            
            <label> Correo electrónico </label>
            <input type="email" className='form-control' required placeholder="Ponga su correo" style={{width:"330px"}}  onChange={(e)=> setEmail(e.target.value)}
             value={email}></input>
            
            <label> Contraseña </label>
            <input type="password" className='form-control' required placeholder="Ponga su contraseña" style={{width:"330px"}}  onChange={(e)=> setPassword(e.target.value)}
             value={password}></input>
            
            <div className='btn-box'> 
                <span> Ya tengo una cuenta
                    <Link to="/login" className="link"> aquí </Link>
                </span>
            </div>
            <div>
            <button type="submit" className="btn btn-success btn-md" style={{backgroundColor:"black"}}> Crear cuenta</button>
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