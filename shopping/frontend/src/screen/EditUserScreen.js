import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {  Form, Button} from 'react-bootstrap'
import Message from '../component/Message'
import FormContainer from '../component/FormContainer'
import { USER_UPDATE_RESET } from '../constans/userConstans'
import { getUserDetails, updateuser } from '../actions/userAction'
import Loader from '../component/Loader'
import { Link } from 'react-router-dom'



function EditUserScreen() {

    const {id} = useParams();

    const dispatch = useDispatch()
    const history = useNavigate()

    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [isAdmin, setIsAdmin] = useState('')


    const userDetails = useSelector(state=>state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state=>state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({type:USER_UPDATE_RESET})
            history('/admin/userlist')
        } else {
            if (!user.name  || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, history, id, successUpdate])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateuser({_id: user.id , name, email , isAdmin}))


    }



  return (
    <div>
        <Link to='/admin/userlist'> Geri</Link>

        <FormContainer>
            <h1>User Düzenle</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

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


                    <Form.Group controlId='isadmin'>
                       <Form.Check
                        type='checkbox'
                        label='Admin mi ?'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        
                        ></Form.Check>


                    </Form.Group>

                    <Button type='submit' variant='warning'>Güncelle</Button>





                </Form>




            )}


        </FormContainer>



    </div>
  )
}

export default EditUserScreen