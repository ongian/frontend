import React, {useState} from 'react'
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCreditCard, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import CardForm from './CardForm';
const PaymentMethod = (params) => {
    const checkoutDetails = useSelector(state => state.checkout);
    const {contact, houseNo, firstName, lastName, state, street, city, zip, remarks} = checkoutDetails.shippingDetails;
    const [paymentMethod, setPaymentMethod] = useState('card');

    const paymentHandler = (e) => {
        setPaymentMethod(e.target.value)
    }
    console.log(paymentMethod)
    return (
        <Col md={6} sm={12}>
            <div className="payment-method">
                <div className="payment-method-shipping-details">
                    <h5>Contact:</h5>
                    <p>{contact} <span>Change <FontAwesomeIcon icon={faPen} /></span></p>
                    <h5>Shipping Info:</h5>
                    <p>{houseNo + ' ' + ' ' + street + ' ' + city + ' ' + state + ' ' + zip} <span>Change <FontAwesomeIcon icon={faPen} /></span></p>
                    {remarks !== '' ? <p>{remarks}</p> : null}
                </div>
            </div>
            <h2>Payment method:</h2>
            <div className="payment-method--select">
                <label>
                    <input onClick={paymentHandler} name="payment" type="radio" value="card" checked />
                    <span>Card <FontAwesomeIcon icon={faCreditCard} /></span>
                </label>
                <label>
                    <input onClick={paymentHandler} name="payment" type="radio" value="cash" />
                    <span>Cash <FontAwesomeIcon icon={faMoneyBill1} /> </span>
                </label>
            </div>
            {
                paymentMethod === 'card' && <CardForm />
            }
        </Col>
    )
}

export default PaymentMethod;