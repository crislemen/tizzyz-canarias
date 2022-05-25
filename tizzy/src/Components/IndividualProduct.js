import {Icon} from 'react-icons-kit'
import {refreshCcw} from 'react-icons-kit/feather/refreshCcw';


//Le paso el prop de producto, donde tengo el array de mis productos cogidos de la bd
//y ahora, los muestro por pantalla todos 

export const IndividualProduct = ({individualProduct, addToCart}) => {
    //console.log(individualProduct);
    
    const handleAddToCart=()=> {
        addToCart(individualProduct)


    }
    
    return (
        <div className='product'>
            <div className='product-image'>
                <img src={individualProduct.image} alt="product-img"/> 
            </div>
            <div className='product-text title'>{individualProduct.title}</div>
            <div className='product-text description'>{individualProduct.description}</div>
            <div className='product-text price'>{individualProduct.price} € <a href="#volver"><Icon icon={refreshCcw} size={20}/></a></div>
            <div className='btn btn-md cart-btn' onClick={handleAddToCart}>Añadir al carrito</div>
            
           
            
        </div>
    )
   

}