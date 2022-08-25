import React, {useState, useEffect}  from 'react'
import { Row, Col} from 'react-bootstrap'
import Product from '../component/Product'
import {ListProducts} from '../actions/productListAction'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../component/Loader'
import Message from '../component/Message'

function HomeScreen() {

  const dispatch =useDispatch()
  const productList = useSelector(state=>state.productList)
  const {loading, error, products} = productList

  useEffect(()=>{

    dispatch(ListProducts())   
    

  }, [dispatch])

 

  return (

   
    <div>
      <h1>Ürünler</h1>

      {loading ? <Loader/>
       :error ? <Message variant='danger'>{error}</Message>
       :
              <Row>
              {products.map(product=>(
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product  product={product}/>

                      </Col>

              ))}
            
              </Row>


    
    
    }


      


    </div>
  )
}

export default HomeScreen