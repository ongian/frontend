import React, {useState, useEffect} from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap';
import Counter from '../../../Auxillary/Counter';
import { Link, useNavigate } from 'react-router-dom';
const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const lsCart = JSON.parse(localStorage.getItem('cart')) || [];
        if(lsCart.length > 0){
            setCart(lsCart);
        }
    }, []);
    useEffect(() => {
        if(cart.length > 0){
            const totalValue = cart.reduce((acc, item) => acc + (item.price * item.count), 0).toFixed(2);
            setTotal(totalValue)
        }
    }, [cart])

    
    const addItem = (id) => {
        const addCart = [...cart];
        let cartIndex = addCart.findIndex((i) => i.id === id);
        const count = addCart[cartIndex].count
        addCart[cartIndex].count = count+1;
        localStorage.setItem('cart', JSON.stringify(addCart));
        setCart(addCart)
    }

    const substractItem = (e, id) => {
        const addCart = [...cart];
        let cartIndex = addCart.findIndex((i) => i.id === id);
        const count = addCart[cartIndex].count;
        if(count > 0){
            addCart[cartIndex].count = count-1;
            localStorage.setItem('cart', JSON.stringify(addCart));
            setCart(addCart)
        } else {
            e.preventDefault();
        }
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
    
    const removeToCart = (id) => {
        const cartItems = [...cart];
        const removeIndex = cartItems.findIndex((i) => i.id === id);
        cartItems.splice(removeIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        setCart(cartItems);
        navigate(0);
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
                        <p><strong>{c.price}</strong></p>
                        <div className="counter d-flex justify-content-center justify-content-md-start">
                            <span onClick={(e) => {substractItem(e, c.id)}} className="decrement btn btn-primary">-</span>
                            <input value={c.count} onChange={(e) => {onChangeValue(e, c.id)}} />
                            <span onClick={() => {addItem(c.id)}} className="increment btn btn-primary">+</span>
                        </div>
                        <button onClick={() => removeToCart(c.id)}>Remove</button>
                    </div>
                </Col>
                <Col sm={3} md={2} className="d-flex align-items-center justify-content-center">
                    <div>
                        Total: {(c.price * c.count).toFixed(2)}
                    </div>
                </Col>
            </Row>
        ))}
        <Row>
            <Col sm={12}>
                <h3 className="text-end">Total: {total}</h3>
            </Col>
        </Row>
        <Col sm={12} className="text-end py-4">
            <Button>Proceed to checkout</Button>
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