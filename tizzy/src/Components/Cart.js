import React,{useState,useEffect} from "react";
import { Navbar } from "./Navbar";
import { auth,fs } from "./Config/Config";
import { CartProducts } from "./CartProducts";
import StripeCheckout from 'react-stripe-checkout';

//Hago de nuevo todo esto, para que cuando cambie del carrito, el navbar se mantenga igual con la sesion iniciada, porque
//sino se cambia a inicio de sesion y etc. Por lo que se lo paso tambien como un props 
export const Cart =() => {

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
   
    //Muestro mis productos en el carro 
    const [cartProducts, setCartProducts] = useState([ ]);

    //Aqui, como antes en la home he hecho lo de la coleccion CArt para que cada usuaario tenga una y se guarden los productos,
    //pues aqui simplemente cojo esa coleccion y la muestro para ese usuario en especifico
   useEffect(()=>{

        auth.onAuthStateChanged(user=>{
            
            if(user) {
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=> {
                    const newCartProduct = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                        
                    
                })); 
                console.log("nuevos productos" ,newCartProduct);
                setCartProducts(newCartProduct);
                  
            })
        }
            else{
                console.log("no amigo")
            }
        })

    }, [])

    //console.log("el cartt",cartProducts);
    //En cartPRoducts, tenemos un array con los productos que hay en el carrito,
    //es decir, si tengo 3 productos, tendré 3 arrays con tododos sus datos dentro, por lo que voy a coger la propiedad qty
    const qty= cartProducts.map(cartProduct=> {
        return cartProduct.qty;
    })

    console.log("el qty",qty);

    //Calculo el total de productos de mi carro
    const reducerOfQty = (accumulador, currentValue)=> accumulador+currentValue;
    const totalQty= qty.reduce(reducerOfQty,0);

    //console.log('total',totalQty);


    //Calculo el total del carrito 
    const price= cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;

    })
    //hago el reducer, es decir que me haga la cuenta de reondear 
    const reducerOfPrice= (accumulador,currentValue)=> accumulador+currentValue;
    const totalPrice= price.reduce(reducerOfPrice,0);

    let Product;
    //Para incrementar en el carrito, esto se lo pasare como props al individual cart produtc
    const cartProductIncrease =(cartProduct) => {
        //console.log(cartProduct);
        Product=cartProduct;
        Product.qty= Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        console.log('icnremento');
        //Ahora necesito mi base de datos para que sepa de que uid es y me lo refleje 
        auth.onAuthStateChanged(user=> {
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('icnremento');
                })
            
        }else{
            console.log('maal');

        }
    })
    }
    //Lo mismo pero en decremento 

    const cartProductDecrease = (cartProduct) => {
        Product=cartProduct;

        if(Product.qty > 1){
            Product.qty= Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;

            auth.onAuthStateChanged(user=> {
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decremento');
                    })
                
            }else{
                console.log('maal');
    
            }
        })

        }
    }

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


 //Si es menor a 1, le digo que no hay nada en el carrito, pero si existe, entonces pongo el componente de cartproducts
 // y le paso los props para poder hacerlo en el otro componente y tenerlo mas organizado 
   return( 
   <>
        <Navbar user={user} totalProducts={totalProducts} />
        {cartProducts.length >= 0 && (

            <>
                  <div className='summary-box'>
                    <h5>Tu compra </h5>
                    <hr/>
                    <div>Productos <span style={{color:"#8b04ad",fontWeight:'bold'}}> {totalQty}</span> 
                    </div>
                    <div>Precio Total <span style={{color:"#8b04ad",fontWeight:'bold'}}>  {totalPrice} € </span></div>
                    <hr/>
                    <StripeCheckout>  
                    </StripeCheckout>
            
                </div>


            <div className='container-fluid'>
                <h1 className='text-center' style={{fontFamily:'fantasy'}}> Carrito </h1>
                <div className='products-box' >
                    <CartProducts cartProducts={cartProducts} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease}/>
                </div>
                
            </div>

              
        </>

        )}
        {cartProducts.length < 1  && (
            <div className='container-noproduct'> No hay productos </div>
        )}
    </>
)

}