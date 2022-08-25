import React, {  useEffect, useState } from 'react'
import {  useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {  Table, Button} from 'react-bootstrap'
import { deleteUser, listUsers } from '../actions/userAction'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {LinkContainer} from 'react-router-bootstrap'

function UserListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin


    const userList = useSelector(state=>state.userList)
    const {loading, users, error} = userList


    const userDelete = useSelector(state=>state.userDelete)
    const {success: successDelete} = userDelete

    const deleteHandler = (id)=>{

        if(window.confirm('Silmek istediğine emin misin ? '))
        {
            dispatch(deleteUser(id))
        }
    }



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } 
        else {
           history('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

  return (
    <div>
            <h2 className='product-title'>Kullanıcılar</h2>
            {loading ? (<Loader/>)
            : error ? (<Message variant='danger'>{error}</Message> ):
            (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>İsim</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>#</th>
                        </tr>

                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i> ) : 
                            (<i className='fa fa-times' style={{color: 'red'}}></i>)
                            
                        }</td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}><Button><i className='fas fa-edit'></i> </Button></LinkContainer>
                            <Button onClick={()=>deleteHandler(user._id)}><i className='fas fa-trash'></i> </Button>


                        </td>



                        </tr>
                        ))}
                    </tbody>


                </Table>





            )
            
        }



    </div>
  )
}

export default UserListScreen