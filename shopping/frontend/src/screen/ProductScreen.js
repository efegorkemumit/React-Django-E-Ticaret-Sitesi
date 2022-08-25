import React, {useState, useEffect}  from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Rating from '../component/Rating';
import '../my.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { ListProductsDetails } from '../actions/productListAction';
import { Row, Col} from 'react-bootstrap'
import Loader from '../component/Loader'
import Message from '../component/Message'



function ProductScreen() {

  const [qty, setQty] = useState()

  const {id} =useParams();
  const dispatch =useDispatch()
  const productDetails = useSelector(state=>state.productDetails)
  const {loading, error, product} = productDetails
  

  useEffect(()=>{
    dispatch(ListProductsDetails(`${id}`))

  }, [])


  let navigate = useNavigate();
  const addTaCartHandler=()=>{
    let path =(`/cart/${id}?qty=${qty}`)
    navigate(path);


  }
  



  return (
    <div>

{loading ? <Loader/>
       :error ? <Message variant='danger'>{error}</Message>
       :
              <Row>
               <div className='header'>
            <div className='row'>
                <div className='col-md-9'> <h2 className='product-title underline'>{product.name} </h2> </div>
                <div className='col-md-3'><Rating value={product.rating} color={'#ffdf00'}></Rating> </div>
                <p className='text-right numve'><i className='fa fa-eye'></i> izlenme {product.numReviews}</p>
            </div>
        </div>
        <div className='container-body mt-20'>
            <div className='row'>
            <div className='col-md-5'>
                <ul>
                    <li> Kategori :{product.category} </li>
                    <li> Marka :{product.brand} </li>
                    <li> Stok :{product.countInStock} </li>
                    <li> Fiyat :{product.price} </li>


                </ul>
                <div className='col-md-12'>
                {product.description}
                </div>

                <div className='col-md-12 mt-20'>
                  {product.countInStock>0 && (
                    <Row>
                      <Col>Adet</Col>
                      <Col>
                          <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                            {

                              [...Array(product.countInStock).keys()].map((x)=>(
                                <option key={x+1}  value={x+1}> {x+1} </option>

                              )
                              )


                            }


                          </Form.Control>
                      </Col>


                    </Row>




                  )}
                  
             


                </div>

                <div className='col-md-12 mt-20'>
                  {product.countInStock<=1 && (
                    
                    <Message variant='danger'>Stokta ürün kalmadı</Message>

                  )}
                  
 
                </div>

              

                                
                


                <div className='col-md-12 mt-20'>
                <Button disabled={product.countInStock===0} onClick={addTaCartHandler} variant='warning'> <i className="fa-solid fa-cart-shopping"></i> Sepete Ekle</Button>
                </div>
                
             </div>
            <div className='col-md-7'>  
            <img src={`/images${product.image}`} className="card-img img-fluid img-detail-full"></img>
            </div>


            </div>

        </div>
            
              </Row>


    
    
    }
    

    
       
        
        
        
        </div>
  )
}

export default ProductScreen