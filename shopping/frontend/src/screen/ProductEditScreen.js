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
import { PRODUCT_UPDATE_RESET } from '../constans/productConstans'
import { ListProductsDetails, updateProduct } from '../actions/productListAction'
import axios from 'axios'

function ProductEditScreen() {

  const {id} = useParams();

  

  const [name, setName] =useState('')
  const [price, setPrice] =useState(0)
  const [image, setImage] =useState('')
  const [brand, setBrand] =useState('') 
  const [category, setCategory] =useState('')
  const [countInStock, setCountInStock] =useState(0)
  const [description, setDescription] =useState('')
  const [uploading, setUploading] =useState(false)
  
  const dispatch = useDispatch()
  const history = useNavigate()

  const productDetails = useSelector(state=>state.productDetails)
  const {error, loading, product} = productDetails

  const productUpdate = useSelector(state=>state.productUpdate)
  const {error :errorUpdate, loading:loadingUpdate, success: successUpdate} = productUpdate



  useEffect(() => {

      
        if (successUpdate) {
            dispatch({type:PRODUCT_UPDATE_RESET})
            history('/admin/productlist')
        } else {
            if (!product.name  || product._id !== Number(id)) {
                dispatch(ListProductsDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
}, [dispatch,  product, history, id, successUpdate])


const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(updateProduct({_id: id , name, price, image,  brand, category, countInStock, description }))


}

const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('product_id', id)

    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/products/upload/', formData, config)


        setImage(data)
        setUploading(false)

    } catch (error) {
        setUploading(false)
    }
}




  return (
   

    <div>
    <Link to='/admin/productlist'> Geri</Link>

    <FormContainer>
        <h1>Ürün Düzenle</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

            <Form onSubmit={submitHandler}>


            <Form.Group controlId='name'>
                    <Form.Label>Urun Adı</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='Ürün İsim Giriniz'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Fiyat</Form.Label>
                    <Form.Control
                     required 
                    type='number'
                    placeholder='Fiyat Giriniz'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Resim</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='Resim Giriniz'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    
                    ></Form.Control>

                    <input type="file" onChange={uploadFileHandler}></input>
                    {uploading && <Loader/>}

                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>marka</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='marka Giriniz'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>Stok</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='marka Giriniz'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>


                <Form.Group controlId='category'>
                    <Form.Label>kategori</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='kategori Giriniz'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Açıklama</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='Açıklama Giriniz'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <br></br>


            

                <Button type='submit' variant='warning'>Güncelle</Button>





            </Form>




        )}


    </FormContainer>



</div>


  )
}

export default ProductEditScreen