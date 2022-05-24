
import React,{useEffect,useState} from "react";
import {Icon} from 'react-icons-kit'
import { auth,fs } from "./Config/Config";
import { Navbar } from "./Navbar";
import emailjs from 'emailjs-com'
import {pen_1} from 'react-icons-kit/ikons/pen_1'



export const Contacto = () => {

    function GetCurrentUser(){
        
        const [user,setUser]=useState(null); //primero lo tengo en null
        
        useEffect(()=>{
            auth.onAuthStateChanged(user=> {
                //si el usuario existe, entonces tendremmos q ir a la bd 
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot => {
                        setUser(snapshot.data().Fullname);
                        //console.log("holaa",snapshot.data());
                    })
                }
                //si el usuario no existe, lo ponemos en null
                else{
                    setUser(null);
                }
            })
        }, [])
        
        return user;
    }
    const user= GetCurrentUser();

    //Para que en mi carrito se vea cuantos productos tengo añadidos, en la etiquetita pequeña del emoticono
    const [totalProducts,setTotalProducts] = useState(0); //primero lo tengo en 0
    // cojo de mi base de datos los productos del carrito que tenga y los edito en el set :D, depsues en el bav se lo paso
    //como props el totalProducts, y alli lo pongo LO MISMO QUE EN HOME, PERO AQUI LO TENGO QUE HACER DE NUEVO PORQUE SI NO
    //AL CAMBIAR A MI CARRITO, EL ICONO SE BUGGEA Y NO SALE EN EL NAV
    useEffect (()=>{
        auth.onAuthStateChanged(user=> {
            if(user){
                fs.collection('Cart '+ user.uid).onSnapshot(snapshot => {
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    },[])

    //Funcion para enviar el email, lo he hecho con emailjs.

    const [successMsg,setSuccessMsg]= useState('');
    //const [name,setName]= useState(null);
    const[uploadError,setUploadError] = useState('');

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_7qlp2xf','template_8kj999w',e.target,"V6KNm-FonbM8AuPrt").then(send=> {
            console.log(send)
           

        }).then(()=>{
            setSuccessMsg ('¡¡Correo enviado!!')
          
            setTimeout(() => {
                setSuccessMsg('');
                
            }, 4000);
        }).catch(error=> setUploadError(error.message))
        
    }
    
    return (
        <>
        
        <Navbar user={user} totalProducts={totalProducts}/>

        <div style={{ width: '50%', marginLeft:'30%',backgroundColor:'white',padding:'10px'}}>
        

        <h1 style={{marginTop:'50px',marginLeft:'77px'}}> <Icon icon={pen_1} size={50} style={{color:"blue"}}/>Formulario de Contacto </h1>

        {successMsg && 
                <>
                <div className='success-msg' style={{marginLeft:'50px'}}>{successMsg}</div>
                
        
              </>
        }

        {uploadError && 
          <>
              <div className="error-msg">{uploadError}</div>
                 
                    
          </>
                
        }

            <form style={{margin:"25px 85px 75px 100px"}} onSubmit={sendEmail}>
                <label> Nombre </label>
                <input type="text" name="name"  className="form-control" style={{width:'75%'}} required/>

                <label> Correo </label>
                <input type="email" name="email" className="form-control" style={{width:'75%'}} required/>

                <label> Asunto del mensaje </label>
                <input type="text" name="subject" className="form-control" style={{width:'75%'}} required/>

                <label> ¿Qué necesitas? </label>
                <textarea name="message" rows="4" className="form-control" style={{width:'75%'}} required/>

                <input type="submit" value="enviar" className="form-control btn btn-primary" style={{width:'15%',marginTop:'20px'}}/> 

            </form>


            
        </div>




        </>
    )
   

}