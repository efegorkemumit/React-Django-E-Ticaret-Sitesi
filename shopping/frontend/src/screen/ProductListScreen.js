import React, {useState, useEffect}  from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Rating from '../component/Rating';
import '../my.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {  createProduct, deleteProduct, ListProducts } from '../actions/productListAction';
import { Row, Col, Table} from 'react-bootstrap'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {LinkContainer} from 'react-router-bootstrap'
import { PRODUCT_CREATE_RESET } from '../constans/productConstans';



function ProductListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const productList = useSelector(state=>state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    


    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } 
        if (successCreate) {
          
            history(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(ListProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const creteProductHandler = () => {
        dispatch(createProduct())
    }

    const deleteHandler = (id)=>{
        if(window.confirm('Silmek istediğine emin misin ? '))
        {
            dispatch(deleteProduct(id))
        }
    }

   


  return (
    <div>
        <Row>
            <Col md={10}>
            <h2 className='product-title'>Ürünler</h2>

                
            </Col>
            <Col md={2} className="text-right">
                <Button onClick={creteProductHandler} className='my-3'> <i className='fas fa-plus'></i> Ürün Ekle</Button>


            </Col>

        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}


        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) :
        (

            <div>
               <Table striped responsive className='table-sm'>
               <thead>
                        <tr>
                            <th>ID</th>
                            <th>İsim</th>
                            <th>Fiyat</th>
                            <th>kategori</th>
                            <th>marka</th>
                            <th>#</th>
                        </tr>

                    </thead>

                    <tbody>
                        {products.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                            <LinkContainer to='#'><Button><i className='fas fa-edit'></i> </Button></LinkContainer>
                            <Button onClick={()=>deleteHandler(product._id)} ><i className='fas fa-trash'></i> </Button>
                            


                        </td>




                            </tr>



                        ))}


                    </tbody>

                </Table>





            </div>






        )
        
    } 




    </div>
  )
}

export default ProductListScreen