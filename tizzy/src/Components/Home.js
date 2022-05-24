import React, {useState, useEffect}from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth,fs } from "./Config/Config";
import {useNavigate} from 'react-router-dom'
import { AddProducts } from "./AddProducts";

export const Home = (props) => {
    const navigate = useNavigate();

    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if(user){
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();


    //usuario actual
    function GetCurrentUser(){
        
        const [user,setUser]=useState(null); //primero lo tengo en null
        
        useEffect(()=>{
            auth.onAuthStateChanged(user=> {
                //si el usuario existe, entonces tendremmos q ir a la bd y cogemos el nombre completo para identifficarlo
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
    
    
    //Creo un estado para mis productos
    const [products,setProducts] =useState([]);

    //creo una funcion para coger mis productos
    const getProducts = async () => {
        const products = await fs.collection('productos').get();

        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push( {
                ...data
            })
            if (productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(() => {
            getProducts();

    },[])
    //Para que en mi carrito se vea cuantos productos tengo añadidos, en la etiquetita pequeña del emoticono
    const [totalProducts,setTotalProducts] = useState(0); //primero lo tengo en 0
    // cojo de mi base de datos los productos del carrito que tenga y los edito en el set :D, depsues en el bav se lo paso
    //como props el totalProducts, y alli lo pongo 
    useEffect (()=>{ //un observable para cuando el usuario acceda correctamente 
        auth.onAuthStateChanged(user=> {
            if(user){
                fs.collection('Cart '+ user.uid).onSnapshot(snapshot => {
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    },[])

    let Product;

    const addToCart = (product)=> {
        if(uid!==null){
            //console.log((product));
            //creo una coleccion separada del usuario, con el, uid, asi cuando quite la sesion no desaparecen los producstos
            //porque estan guardados ya en esa coleccion .
            //El usuario que añada un producto a su carrito, lo guardaré en mi firestore con "Cart", mas el uid de ese usuario
            //para identificar quien es 
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']= Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=> {
                console.log('agregado al carrito')
            })
        }
        //Si no estás logeado, no puedes comprar el producto, por lo que te lleva a la pagina de login 
        else {
            navigate('/login');
        }
    }

return (
    <>
        <Navbar user={user} totalProducts={totalProducts}/>
        
       {user=="cristian" &&
       
         <AddProducts user={user}/>
        
        }
        
        {products.length > 0 && user!="cristian" && (
            <div className="container-fluid">
                <h1 className="text-center"> Productos </h1>
                <div className ='products-box'> 
                <Products products= {products} addToCart={addToCart}/>
                </div>
            </div>
        )} 
        {products.length < 1 && user!="cristian" && (
            <div className='container-espere'> Porfavor espere...</div>
        )}
    </>
)

}