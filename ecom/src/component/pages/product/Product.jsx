import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../../../Auxillary/Rating';
import SkeletonComponent from '../../../Auxillary/SkeletonComponent';
import Counter from '../../../Auxillary/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
const Product = () => {
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  useEffect(() => {
    const fetchProduct = async() => {
      setLoading(true)
      try {
        const req = await fetch(`https://fakestoreapi.com/products/${param.id}`);
        if(!req.ok){
          throw new Error('Failed to fetch product id: ' + param.id)
        }
        const res = await req.json();
        setProduct(res)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchProduct()
  }, [])
  
  const countItem = (count) => {
    setItemCount(count)
  }

  const addItemToCart = () => {
    const item = {
      id: param.id,
      title: product.title,
      price: product.price,
      count: itemCount,
      image: product.image
    }
    dispatch(addToCart(item))
  }
  const checkout = () => {
    const item = {
      count: itemCount,
      price: product.price,
      image: product.image,
      title: product.title,
      id: product.id
    }
    localStorage.setItem('checkout', JSON.stringify([item]));
    navigate('/checkout')
  }

  const addedToCart = cart.cart.filter(c => param.id === c.id).length > 0 ? <p className="text-sucess">Added to cart!</p> : null;
  const PDP = product ? (
    <Container>
      <Breadcrumb className="my-4">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to={"/category/" + product.category}>{product.category}</Link>
        <span> / </span>
        <Link to="#">{product.title}</Link>
      </Breadcrumb>
      <Row>
        <Col xs={12} md={6}>
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="review my-3 my-md-0">
          <Rating rate={product.rating.rate} /> ({product.rating.rate}) {product.rating.count ? ` - ${product.rating.count + 'reviews'}` : null}
          </div>
          <h1>{product.title}</h1>
          <h2>${product.price}</h2>
          <p>{product.description}</p>
          <h3>Total: <strong>${(product.price * itemCount).toFixed(2)}</strong></h3>
          <div className="counter-and-buttons d-md-flex align-items-center justify-content-between">
            <Counter countItem={countItem}/>
            <div className="buttons">
              <button className="btn btn-primary" onClick={checkout}>Checkout</button>
              <button className="btn btn-secondary" onClick={addItemToCart}>Add to cart</button>
            </div>
          </div>
          {addedToCart}
        </Col>
      </Row>
    </Container>
  ) : null;
  
  const skeleton = (
      <SkeletonComponent loading={loading}>
        <Container className="my-4">
          <p style={{maxWidth: '400px'}}></p>
          <Row>
            <Col xs={12} md={6}>
              <div className="div" style={{width: '100%', minHeight: '500px'}}></div>
            </Col>
            <Col xs={12} md={6}>
              <p style={{maxWidth: '400px'}}></p>
              <h1></h1>
              <h2></h2>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <h4 style={{maxWidth: '300px'}}></h4>
              <Row>
                <Col md={5} xs={12}>
                  <div className="div" style={{minHeight: '48px'}}></div>
                </Col>
                <Col md={7} xs={12}>
                <div className="div" style={{minHeight: '48px'}}></div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
    </SkeletonComponent>
  )
  return (
    <section className="pdp">
      {skeleton}
      {PDP}
    </section>
  )
}

export default Product;