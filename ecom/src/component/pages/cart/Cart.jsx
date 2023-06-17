import React, {useState, useEffect} from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import Counter from '../../../Auxillary/Counter';
const Cart = () => {
    const [cart, setCart] = useState([])
  return (
    <section className="cart">
        <Container>
            <Row>
                <Col sm={4} medium={3}>
                    <img src="" alt="" />
                </Col>
                <Col sm={8} medium={9}>
                    <div>
                        <h3>Product Name</h3>
                        <p>Price</p>
                        <Counter />
                        <button>Remove</button>
                    </div>
                    <div>
                        Total: 0
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Cart;