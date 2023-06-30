import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ShippingInfo from './forms/ShippingInfo';
import PaymentMethod from './forms/PaymentMethod';
import { useSelector } from 'react-redux';
const Checkout = () => {
const [checkoutItem, setCheckoutItem] = useState([]);
const checkout = useSelector((state) => state.checkout);

console.log(checkout)
useEffect(() => {
    const checkoutLS = JSON.parse(localStorage.getItem('checkout')) || [];
    setCheckoutItem(checkoutLS);
}, []);


console.log(checkout)
const orderInfo = (
    <Col md={6} sm={12}>
        {checkoutItem.length > 0 ? (<>
            {checkoutItem.map(c => (
                <div className="checkout-item" key={c.id}>
                    <div className="checkout-item__image">
                        <img src={c.image} alt={c.title} />
                        <span>{c.count}</span>
                    </div>
                    <div className="checkout-item__title">
                        <h6>{c.title}</h6>
                    </div>
                    <div className="checkout-item__total">
                        <h6>${c.price * c.count}</h6>
                    </div>
                </div>
            ))}
            <div className="d-flex align-items-center justify-content-between checkout-item-total">
                <div><strong>Total: </strong></div>
                <div>${Number(checkoutItem.reduce((a, i) => (a) + (i.count * i.price), 0)).toFixed(2)}</div>
            </div>
        </>): null}
    </Col>
);
    return (
        <section className="checkout">
            <Container>
                <Col sm="12">
                    <h1>Checkout</h1>
                </Col>
                <Row>
                {checkout.shippingSteps ? <PaymentMethod /> : <ShippingInfo />}
                {orderInfo}
                </Row>
            </Container>
        </section>
    )
}


export default Checkout;