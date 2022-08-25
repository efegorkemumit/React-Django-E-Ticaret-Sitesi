import CheckOutSteps from '../component/CheckoutSteps'
import React, {  useEffect, useState } from 'react'
import {  useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {  Row, Col, Button, Card, ListGroup, Image} from 'react-bootstrap'
import Message from '../component/Message'
import { ORDER_CREATE_RESET } from '../constans/orderConstans'
import { createOrder } from '../actions/orderAction'


function PlaceOrderScreen() {

    const cart = useSelector(state => state.cart)

    cart.ItemsPrice = cart.cartItems.reduce((acc, item) =>acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.ItemsPrice> 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.088) * cart.ItemsPrice).toFixed(2)
   

    cart.TotalPrice =  ( Number(cart.ItemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice) )

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    console.log(cart)
    const dispatch = useDispatch()
    const history = useNavigate()


    if(!cart.paymentMethod)
    {
      history('/payment')
    }

    useEffect(()=>{
        if(success){
            history(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})

        }

    }, [success, history] )

    const placeOrder = () =>
    {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            ItemsPrice:cart.ItemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            TotalPrice:cart.TotalPrice,
            

            

        }))
       

    }



    



  return (
    <div>

              <CheckOutSteps step1 step2 step3 step4/>

              <Row>
                <Col md={8}>
          <ListGroup variant='flush'>
                <ListGroup.Item className='orderTm'>
                    <h4>Sipariş Bilgileri</h4>
      
                 </ListGroup.Item>

                 <ListGroup.Item>
                 <p>
                        <strong>Adres :</strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}

                    </p>
                 </ListGroup.Item>
                
                
             </ListGroup>

             <ListGroup variant='flush'>
                <ListGroup.Item className='orderTm'>
                    <h4>Ödeme Bilgileri</h4>
      
                 </ListGroup.Item>

                 <ListGroup.Item>
                 <p>
                        {cart.paymentMethod}

                    </p>
                 </ListGroup.Item>
                
                
             </ListGroup>


             <ListGroup>

             <ListGroup.Item className='orderTm'>
                    <h4>ürün</h4>
      
                 </ListGroup.Item>

             <ListGroup.Item>
               
                {cart.cartItems.length ===0 ? <Message variant='info'> Sepetiniz boş</Message>:
                (
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item,index)=>(

                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                    <img src={`/images${item.image}`} width="50" alt={item.name} fluid rounded />


                                    </Col>

                                    <Col md={7}>
                                        <Link to={`/product/${item.product}`}>{item.name} </Link>


                                    </Col>

                                    <Col md={4}>
                                        {item.qty} x $  {item.price}  = $ { (item.qty * item.price).toFixed(2)}


                                    </Col>




                                </Row>


                            </ListGroup.Item>

                        )

                        
                        
                        )}

                    </ListGroup>


                )
                
                
                }


             </ListGroup.Item>



             </ListGroup>




                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='orderTm'>
                                <h2>Alışverişi tamamla</h2>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Ürün :</Col>
                                    <Col>${cart.ItemsPrice}</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>


                                <Row>
                                    <Col>kargo :</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>

                             </ListGroup.Item>
                             <ListGroup.Item>

                                <Row>
                                    <Col>kdv :</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                             </ListGroup.Item>
                                <ListGroup.Item>
                                <Row>
                                    <Col>toplam :</Col>
                                    <Col>${cart.TotalPrice}</Col>
                                </Row>


                            </ListGroup.Item>

                            <ListGroup.Item>
                               {error && <Message variant='danger'> {error}</Message> } 


                            </ListGroup.Item>

                            <ListGroup.Item>
                            <Button type='button' onClick={placeOrder} disabled={cart.cartItems===0} variant='warning'>Siparişi Tamamla</Button>

                              


                            </ListGroup.Item>


                        </ListGroup>


                    </Card>


                </Col>


              </Row>




    </div>
  )
}

export default PlaceOrderScreen