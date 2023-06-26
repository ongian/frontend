import React, {useState, useEffect} from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap';
import Counter from '../../../Auxillary/Counter';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeToCart } from '../../redux/cartSlice';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart.cart);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(cart.reduce((a, i) => a + (i.count * i.price), 0));
    }, [cart])
    const addItem = (id) => {
        dispatch(addToCart(id))
    }

    const substractItem = (id) => {
        dispatch(removeToCart(id))
    }

    const onChangeValue = (e, id) => {
        const value = e.target.value
        const addCart = [...cart];
        let cartIndex = addCart.findIndex((i) => i.id === id);
        const count = addCart[cartIndex].count
        addCart[cartIndex].count = isNaN(value) ? 0 : Number(e.target.value);
        localStorage.setItem('cart', JSON.stringify(addCart));
        setCart(addCart)
    }

    const checkOut = () => {
        localStorage.setItem('checkout', JSON.stringify(cart));
        navigate('/checkout');
    }
    const cartContent = cart.length > 0 ? (<>
        {cart.map((c) => (
            <Row key={c.id}>
                <Col sm={3} md={2} className="d-flex align-items-center justify-content-center">
                    <img src={c.image} alt={c.title} />
                </Col>
                <Col sm={6} md={8}>
                    <div className="text-center text-md-start">
                        <Link to={"/product/" + c.id}>{c.title}</Link>
                        <p><strong>${c.price}</strong></p>
                        <div className="counter d-flex justify-content-center justify-content-md-start">
                            <span onClick={() => {substractItem(c.id)}} className="decrement btn btn-primary">-</span>
                            <input value={c.count} onChange={(e) => {onChangeValue(e, c.id)}} />
                            <span onClick={() => {addItem(c.id)}} className="increment btn btn-primary">+</span>
                        </div>
                        <button onClick={() => substractItem({id: c.id})}>Remove</button>
                    </div>
                </Col>
                <Col sm={3} md={2} className="d-flex align-items-center justify-content-center">
                    <div>
                        Total: ${(c.price * c.count).toFixed(2)}
                    </div>
                </Col>
            </Row>
        ))}
        <Row>
            <Col sm={12}>
                <h3 className="text-end">Total: ${total.toFixed(2)}</h3>
            </Col>
        </Row>
        <Col sm={12} className="text-end py-4">
            <Button onClick={checkOut}>Proceed to checkout</Button>
        </Col>
        </>
    ) : <h2>No products found in cart</h2>;
  return (
    <section className="cart">
        <Container>
            <Col sm={12}>
                <h1>Cart</h1>
            </Col>
            {cartContent}
        </Container>
    </section>
  )
}

export default Cart;