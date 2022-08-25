import React, { useEffect, useState } from 'react'
import { useLocation,  useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { register} from '../actions/userAction'
import { Row, Col,  Form, Button} from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from '../component/FormContainer'



function RegisterScreen() {
    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state=>state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submithander=(e) =>{
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Parola eşleşmedi')
        }
        else{
            dispatch(register(name,email,password))
        }


     
    }


  return (
    <div>
        <FormContainer>
            <h1>Kayıt ol</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submithander}>
            <Form.Group controlId='name'>
                <Form.Label>İsim </Form.Label>
                <Form.Control 
                type='text'
                placeholder='İsim giriniz'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                
                >
             </Form.Control>
            </Form.Group>

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


            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Parola Tekrar</Form.Label>
                <Form.Control 
                type='password'
                placeholder='Parola Giriniz'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                
                >
             </Form.Control>
            </Form.Group>


            <Button type='submit' variant='warning'> Kayıt Ol</Button>
             </Form>


             <Row className='py-3'>
                <Col>
                 zaten hesabınız var mı ? <Link to={redirect? `/login?redirect={redirect}`: '/login'}>Kayıt ol</Link>
                
                </Col>
            </Row>




        </FormContainer>



    </div>
  )
}

export default RegisterScreen