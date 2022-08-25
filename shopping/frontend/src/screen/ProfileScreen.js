import React, { useEffect, useState } from 'react'
import {  useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateUserProfile, getUserDetails} from '../actions/userAction'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constans/userConstans'
import { listMyOrders } from '../actions/orderAction'
import {LinkContainer} from 'react-router-bootstrap'
 


function ProfileScreen() {

    

    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()


    const userDetails = useSelector(state=>state.userDetails)
    const {error, loading, user} = userDetails
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state=>state.orderListMy)
    const {error:errorOrders, loading:loadingOrders, orders} = orderListMy

    

  
    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    

    const submitHandler = (e)=>{
        e.preventDefault()

        if(password!==confirmPassword){
            setMessage('Parolalar aynı değil')
        }
        else
        {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password':password


            }))
            setMessage('')

        }


    }



  return (
    <div>
        <Row>
            <Col md={4}>
                <h2 className='product-title'>Profilim</h2>
                {message && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                         required 
                        type='name'
                        placeholder='İsim Giriniz'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                         required 
                        type='email'
                        placeholder='Email Giriniz'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Parola</Form.Label>
                        <Form.Control
                         required 
                        type='password'
                        placeholder='Password Giriniz'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>


                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Tekrar Parola</Form.Label>
                        <Form.Control
                         required 
                        type='password'
                        placeholder='Password Giriniz'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Button type='submit' variant='warning'>Güncelle</Button>



                </Form>
            
            </Col>

            <Col md={8}>
            <h2 className='product-title'>Siparişlerim</h2>
            {loadingOrders ? (<Loader/>) : 
            errorOrders ? (<Message variant='danger'>{errorOrders}</Message> ):
            (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tarih</th>
                            <th>Toplam Fiyat</th>
                            <th>Ödeme Durumu </th>
                            <th>Detaylar </th>


                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createAt}</td>
                                <td>{order.TotalPrice}</td>
                                <td>{order._isPaid ? order.paidAt : (<i className='fa fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button> Detaylar</Button>
                                    
                                    </LinkContainer>


                                </td>


                            </tr>


                        ))}


                    </tbody>


                </Table>
            )
            
            
            }


            </Col>


        </Row>


        
    </div>
  )
}

export default ProfileScreen