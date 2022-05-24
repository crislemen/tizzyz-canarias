import React from "react";
import { IndividualProduct } from "./IndividualProduct";

export const Products = ({products,addToCart}) => {
    //console.log(products);

//Recorro los productos de mi base de dato, y los cojo todos, y esto se lo paso por props a los individuales para mayor organizacion 
    return products.map((individualProduct) => (
        <IndividualProduct key={individualProduct.ID} individualProduct={individualProduct}
            addToCart={addToCart}
        />
    
))

}