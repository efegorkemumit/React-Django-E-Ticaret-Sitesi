import React from 'react'
import { Button } from 'react-bootstrap'
import products from '../product'
import Rating from './Rating'
import { LinkContainer } from 'react-router-bootstrap'


function Product({product}) {
    
  return (
    <div>
        <div className='card mb-10'> 
           <div className='card-body'>
               <div className='card-img-actions'>
                
               <img src={`/images${product.image}`} className="card-img img-fluid" width={96} height={350}></img>


               </div>

           </div>
           <div className='card-body bg-light text-center'>
               <div className='mb-2'>
                   <h6>
                   <LinkContainer to={`/product/${product._id}`}>
                       <a  className="product-title">{product.name} </a>
                     </LinkContainer>
                   </h6>
                   <span className='product-category'> {product.category}</span>
               </div>

               <div>

                   <Rating value={product.rating} color={'#ffdf00'}></Rating>
             
                  
              </div>

              <div className='text-muted mb-3'>{product.numReviews}</div>

              <h3 className='mb-10'> $ {product.price}  </h3>

              <LinkContainer to={`/product/${product._id}`}>
              <Button  variant='warning'> <i className="fa-solid fa-cart-shopping"></i> Sepete Ekle</Button>
              </LinkContainer>
           </div>
         
        
        </div>
        
      </div>
  )
}

export default Product