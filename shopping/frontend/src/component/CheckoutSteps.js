import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function CheckOutSteps({step1, step2,step3,step4}) {
  return (
    <div>
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1?(
                <LinkContainer to='/login'>
                    <Nav.Link>Üye Girişi</Nav.Link>
                </LinkContainer>
            ):
            (
                <Nav.Link disabled>Üye Girişi</Nav.Link>
            )    }

            </Nav.Item>

            <Nav.Item>
                {step2?(
                <LinkContainer to='/shipping'>
                    <Nav.Link>Adres Bilgileri</Nav.Link>
                </LinkContainer>
            ):
            (
                <Nav.Link disabled>Adres Bilgileri</Nav.Link>
            )    }

            </Nav.Item>


            <Nav.Item>
                {step3?(
                <LinkContainer to='/payment'>
                    <Nav.Link>Ödeme Bilgileri</Nav.Link>
                </LinkContainer>
            ):
            (
                <Nav.Link disabled>Ödeme Bilgileri</Nav.Link>
            )    }

            </Nav.Item>


            <Nav.Item>
                {step4?(
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Tamamlandı</Nav.Link>
                </LinkContainer>
            ):
            (
                <Nav.Link disabled>Tamamlandı</Nav.Link>
            )    }

            </Nav.Item>


        </Nav>




    </div>
  )
}

export default CheckOutSteps