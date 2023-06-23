import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
const Checkout = (params) => {
    const [shippingInfo, setShippingInfo] = useState({
        contact: '',
        firstName: '',
        lastName: '',
        state: '',
        houseNo: '',
        street: '',
        city: '',
        zip: '',
        remarks: ''
    });
    const [checkoutItem, setCheckoutItem] = useState([]);
    useEffect(() => {
        const checkoutLS = JSON.parse(localStorage.getItem('cart')) || [];
        setCheckoutItem(checkoutLS);
    }, []);

    console.log(checkoutItem)
    const shippingForm = (
        <Col md={6} sm={12}>
            <form>
                <h4>Contact Info</h4>
                <div className="form-group">
                    <label>Mobile Phone Number or Email Address</label>
                    <input className="form-control" type="text" value={shippingInfo.contact} />
                </div>
                <h4>Shipping Info</h4>
                <div>
                    <Row>
                        <Col className="form-group" sm="12" md="6">
                            <label>First Name</label>
                            <input className="form-control" type="text" value={shippingInfo.firstName} />
                        </Col>
                        <Col className="form-group" sm="12" md="6">
                            <label>Last Name</label>
                            <input className="form-control" type="text" value={shippingInfo.lastName} />
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label>Unit / House / Apartment / Building No.</label>
                        <input className="form-control" type="text" value={shippingInfo.houseNo} />
                    </div>
                    <div className="form-group">
                        <label>Street Address</label>
                        <input className="form-control" type="text" value={shippingInfo.street} />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input className="form-control" type="text" value={shippingInfo.city} />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input className="form-control" type="text" value={shippingInfo.state} />
                    </div>
                    <div className="form-group">
                        <label>Zip Code</label>
                        <input className="form-control" type="text" value={shippingInfo.zip} />
                    </div>
                    <div className="form-group">
                        <label>Remarks / Instruction</label>
                        <input className="form-control" type="textbox" value={shippingInfo.remarks} />
                    </div>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </Col>
    );

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
                <div className="d-flex align-items-center justify-content-end">
                    <div>Sub-total</div>
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
                    {shippingForm}
                    {orderInfo}
                </Row>
            </Container>
        </section>
    )
}


export default Checkout;