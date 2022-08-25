import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartAction'
import { Row, Col, ListGroup, Form, Button, Image,Card, ListGroupItem} from 'react-bootstrap'
import Message from '../component/Message'
import { LinkContainer } from 'react-router-bootstrap'

function CartScreen() {

    const {id} = useParams();
   
    const useQty= useLocation()
    const qty = useQty.search ? Number (useQty.search.split('=')[1]):1


    const dispatch = useDispatch()
    const history = useNavigate()


    const cart = useSelector(state=> state.cart)
    const {cartItems} =cart

    const removeFromCartHandler =(id)=>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler=()=>{
        history('/shipping')

    }
 
    useEffect(()=>
    {
        if(id)
        {
            dispatch(addToCart(id,qty))
        }
    }, [dispatch, id, qty]
    
    
    
    
    )
    
  return (
    <div>

        <Row>
            <Col md={8}>
                <h1 className='product-title'>Sepetim</h1>
                {cartItems.length ===0 ?(
                    <Message variant='info'>
                        Sepetim Boş 

                    </Message>

                ): (
                    <ListGroup variant='flush'>
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    
                                <img src={`/images${item.image}`} width='80' alt={item.image}/>
                                </Col>
                                <Col md={2}>
                                  {item.name}
                                </Col>
                                <Col md={2}>
                                    {item.price}
                                </Col>


                                <Col md={3}>
                                   <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                       {

                                           [...Array(item.countInStock).keys()].map((x)=>
                                              <option key={x+1} value={x+1}>{x+1}</option>

                                           )

                                       }

                                   </Form.Control>
                                </Col>

                                <Col md={1}>
                                    <Button onClick={()=>removeFromCartHandler(item.product)} type='button' variant='light'><i className='fa fa-trash'></i></Button>
                                </Col>



                            </Row>



                            </ListGroup.Item>


                        ))}



                    </ListGroup>





                )
                
                
                
                }




            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Toplam ({cartItems.reduce((acc, item)=> acc+item.qty,0)}) ürün</h2>
                            $({cartItems.reduce((acc, item)=> acc+item.qty* item.price,0).toFixed(2)})

                        </ListGroupItem>


                    </ListGroup>
                    <ListGroup.Item>
                        <Button onClick={checkoutHandler} type='button' className='btn-block' disabled={cartItems.length===0}>
                            Alışverişi  Tamamla
                        </Button>


                    </ListGroup.Item>



                </Card>



            </Col>



        </Row>




    </div>
  )
}

export default CartScreen