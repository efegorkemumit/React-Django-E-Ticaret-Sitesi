import CheckOutSteps from '../component/CheckoutSteps'
import FormContainer from '../component/FormContainer'
import React, {  useState } from 'react'
import {  useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../actions/cartAction'
import {  Form, Button} from 'react-bootstrap'



function ShippingScreen() {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} =cart

  const dispatch = useDispatch()
  const history = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setcountry] = useState(shippingAddress.country)

  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    history('/payment')

  }



  return (
    <div>


      <FormContainer>
        <CheckOutSteps step1 step2/>
        <h2 className='product-title'>Adres Bilgilerim</h2>

        <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <Form.Label>Adres</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='adres giriniz'
                        value={address ? address: ''}
                        onChange={(e) => setAddress(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>Şehir</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='Sehir giriniz'
                        value={city ? city: ''}
                        onChange={(e) => setCity(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='postalCode'>
                        <Form.Label>Post Kodu</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='Post Kodu giriniz'
                        value={postalCode ? postalCode: ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                        
                     ></Form.Control>


                    </Form.Group>

                    


                    <Form.Group controlId='country'>
                        <Form.Label>ülke</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='Ülke Giriniz'
                        value={country ? country: ''}
                        onChange={(e) => setcountry(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Button type='submit' variant='warning'>Güncelle</Button>



                </Form>


      </FormContainer>
      




    </div>
  )
}

export default ShippingScreen