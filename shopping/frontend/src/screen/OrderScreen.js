import CheckOutSteps from '../component/CheckoutSteps'
import React, {  useEffect, useState } from 'react'
import {  useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {  Row, Col, Button, Card, ListGroup, Image} from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { ORDER_CREATE_RESET, ORDER_DELIVER_RESET } from '../constans/orderConstans'
import { createOrder, deliverOrder, getOrderDetails } from '../actions/orderAction'
import { useParams } from 'react-router-dom'



function OrderScreen() {

    const {id} = useParams();
    const dispatch = useDispatch()
    const history = useNavigate()

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, sucess:successDeliver } = orderDeliver


    if(!loading && !error)
    {

        order.ItemsPrice = order.orderItems.reduce((acc, item) =>acc + item.price * item.qty, 0).toFixed(2)



    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    useEffect(() => {

        if (!userInfo) {
            history('/login')
        }

        if (!order ||  order._id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(id))
         
        } 
      
    }, [dispatch, order, id,  successDeliver])


  return  loading? (<Loader/>)  : error?(<Message variant='danger'>{error}</Message>) :(

    
    <div>
        <Message variant='success'>Sipariniz başarılı bir şekilde alındı.</Message>


        <Row>

            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3 className='product-title'>Kişisel Bilgiler</h3>
                        <p><strong>İsim Soyisim   : </strong>{order.user.name} </p>
                        <p><strong>Email   : </strong>{order.user.email} </p>


                        <h3 className='product-title'>Adres Bilgileri</h3>
                        <p><strong>Adres    : </strong>{order.shippingAddress.address} {order.shippingAddress.city}  {order.shippingAddress.postalCode} {order.shippingAddress.country} </p>
                        <p><strong>Email   : </strong>{order.user.email} </p>




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
                                    <Col>${order.ItemsPrice}</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>


                                <Row>
                                    <Col>kargo :</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>

                             </ListGroup.Item>
                             <ListGroup.Item>

                                <Row>
                                    <Col>kdv :</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                             </ListGroup.Item>
                                <ListGroup.Item>
                                <Row>
                                    <Col>toplam :</Col>
                                    <Col>${order.TotalPrice}</Col>
                                </Row>


                            </ListGroup.Item>

                           


                        </ListGroup>


                    </Card>


                </Col>

                <Col md={12}>

                <ListGroup.Item>
               
               {order.orderItems.length ===0 ? <Message variant='info'> Sipariniş boş</Message>:
               (
                   <ListGroup variant='flush'>
                       {order.orderItems.map((item,index)=>(

                           <ListGroup.Item key={index}>
                               <Row>
                                   <Col md={1}>
                                         <img src={item.image} width="50" alt={item.name}   />


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


            {loadingDeliver && <Loader/>}
            {userInfo && userInfo.isAdmin &&  !order.isDelivered && (
                <ListGroup.Item>
                    <Button type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                    >
                        Sipariş Al.
                    </Button>


                </ListGroup.Item>


            )}

                </Col>


        </Row>



    </div>
  )
}

export default OrderScreen