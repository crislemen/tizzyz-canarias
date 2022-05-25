import React from "react";
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { auth,fs } from "./Config/Config";

//Recojo los props del componente cart.

export const IndividualCartProduct =({cartProduct,cartProductIncrease,cartProductDecrease}) => {

    const handleCartProductIncrease = () => {
        cartProductIncrease(cartProduct);
    }
    const handleCartProductDecrease = () => {
        cartProductDecrease(cartProduct);
    }
    //Para borrar, simplemente vamos a nuestro documento de cart en la base de datos y le hago un delete
    const handleCartProductDelete = () => {
        auth.onAuthStateChanged(user=>{
            if(user) {
                fs.collection('Cart '+ user.uid).doc(cartProduct.ID).delete().then(()=> {
                    console.log('borrado');
                })
            }
        })
    }

    return (
    <div className='product'>
        <div className='product-image'>
            <img src={cartProduct.image} alt="product-image"/>
        </div>
        <div className="product-text title">{cartProduct.title}</div>
        <div className="product-text description">{cartProduct.description}</div>
        <div className="product-text price">{cartProduct.price} € </div>
        <span>Cantidad </span>
        <div className="product-text quiantity-box" style={{backgroundColor: '#b7a3b757', borderRadius: '5px'}}>
            <div className='action-btns minus' onClick={handleCartProductDecrease} >
                <Icon icon={minus} size={20}/>
            </div>
            <div>{cartProduct.qty}</div>
            <div className= 'action-btns plus' onClick={handleCartProductIncrease} >
            <Icon icon={plus} size={20}/>
            </div>
        </div>
        <div className='product-text cart-price'> {cartProduct.TotalProductPrice} € </div>
        <div className='btn btn-md cart-btn-delete' onClick={handleCartProductDelete}> BORRAR </div>
       
    </div>
    )
}