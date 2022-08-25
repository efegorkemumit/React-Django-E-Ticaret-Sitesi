import React, { useEffect, useState } from 'react'
import { useLocation,  useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userAction'
import { Row, Col, Form, Button} from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from '../component/FormContainer'


function LoginScreen() {
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state=>state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }


    }, [history, userInfo, redirect])

    const submithander=(e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }




  return (
    <div>

        <FormContainer>
            <h1>Login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}

            <Form onSubmit={submithander}>

            <Form.Group controlId='email'>
                <Form.Label>Email Adresi</Form.Label>
                <Form.Control 
                type='email'
                placeholder='Email adresini giriniz'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
                >
             </Form.Control>
            </Form.Group>



            <Form.Group controlId='password'>
                <Form.Label>Parola</Form.Label>
                <Form.Control 
                type='password'
                placeholder='Parola Giriniz'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
                >
             </Form.Control>
            </Form.Group>

            <Button type='submit' variant='warning'> Giriş yap</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                 yeni kullanıcı mısınız ? <Link to={redirect? `/register?redirect={redirect}`: '/register'}>üye ol</Link>
                
                </Col>
            </Row>






        </FormContainer>


    </div>
  )
}

export default LoginScreen