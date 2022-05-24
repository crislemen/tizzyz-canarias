import React,{useState} from "react";
import { storage,fs,auth } from "./Config/Config";
import {thumbsUp} from 'react-icons-kit/feather/thumbsUp'
import Icon from "react-icons-kit";


export const AddProducts = ({user}) => {

    //Le doy un estado inicial 
    const[title,setTitle]= useState('');
    const [description, setDescription]= useState ('');
    const [price, setPrice]= useState ('');
    const [image,setImage] = useState (null);
    
    //Los mensajes que pondré en el form si sale algo mal o bien
    const [imageError,setImageError] =useState('');
    const [successMsg,setSuccessMsg]= useState('');
    const [uploadError, setUploadError] = useState('');

    //Para que la imagen funcione bien en los formatos correctos NO ME FUNCIONA EL TRY CATH TENGO QUE VERLO 
    const types= ['image/jpg','image/jpeg','image/png','image/PNG'];
    const handleProductImg = (e) => {
        let selectedFile =  e.target.files[0];
        try {
                 if (selectedFile){
                    if(selectedFile&&types.includes(selectedFile.type)){
                            setImage(selectedFile);
                            setImageError('');
                    }else {
                        setImage(null);
                        setImageError('Suba el formato correcto (png o jpg)');
                        console.log(selectedFile);
                    }
                    
                }else {
                    alert("Error en subir la foto")
                }
    } catch(err){
        alert("Error en subir la foto")
    }
  }

    //Agregamos el producto a la base de datos
   const handleAddProducts = (e) => {

    e.preventDefault();
    //console.log(title,description,price);
    //console.log(image);

    const uploadTasks= storage.ref(`product-images/${image.name}`).put(image);

    uploadTasks.on('state_changed',snapshot=> {
        const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(progress);
    }, error=>setUploadError(error.message), () => {
        storage.ref('product-images').child(image.name).getDownloadURL().then(image => {
            fs.collection('productos').add({
                title,
                description,
                price: Number(price),
                image
            }).then(()=> {
                setSuccessMsg ('¡¡PRODUCTO AÑADIDO!!');
                setTitle('');
                setDescription('');
                setPrice('');
                document.getElementById('file').value='';
                setImageError('');
                setUploadError('');
                setTimeout(() => {
                    setSuccessMsg('');
                }, 3000);
            }).catch(error => setUploadError(error.message));
        })
    })

   }
   const [id,setID] = useState('');
   const handleCartProductDelete = (id) => {
    auth.onAuthStateChanged(user=>{
        if(user) {
            fs.collection('productos ').doc(id).delete().then(()=> {
                console.log('borrado');
            })
        }
    })
}


   //esto solo saldrá para el usuario admin, por lo que cojo el prop de user que le he pasado y hago la comprobacion
    return (
        
        <div className='container-login'>
           {user && user=="cristian" &&
        <> <h1> <Icon icon={thumbsUp} size={40} style={{color:'green'}}/>Agregar Productos </h1>
        <hr></hr>
        </>
        }
           
        {successMsg && 
        <>
        <div className='succes-msg'>{successMsg}</div>
        
        
        </>}

        {user && user=="cristian" &&
        <>
        
        <form autoComplete="off" className="form-group" onSubmit={handleAddProducts}>

                <label> Titulo </label>
                <input type="text" className="form-control" required style={{width:"330px"}} onChange={(e) => setTitle(e.target.value)} value= {title}></input>
                

                <label> Descripción </label>
                <input type="text" className="form-control" required style={{width:"330px"}} onChange={(e) => setDescription(e.target.value)} value= {description}></input>
                

                <label> Precio </label>
                <input type="number" className="form-control" required style={{width:"330px"}} onChange={(e) => setPrice(e.target.value)} value= {price}></input>
                

                <label> Imagen </label>
                <input type="file" id="file" className="form-control" style={{width:"330px"}} required onChange={handleProductImg}></input>
                
                {imageError && 
                  <>
                  <div className="error-msg">{imageError}</div>
                 
                    
                </>
                
                }
                    <div style={{marginTop:'10px',marginLeft:'0px'}}>
                    <button type="submit" className="btn btn-success btn-md"> Subir </button>
                    </div>
                    {uploadError && 
                  <>
                  <div className="error-msg">{uploadError}</div>
                 
                    
                </>
                
                }


        </form>
        
         </>

        }
    </div>
    
    )




}