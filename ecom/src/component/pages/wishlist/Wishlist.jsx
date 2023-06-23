import React, {useState, useEffect} from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import SkuCard from '../../../Auxillary/SkuCard';
import SkeletonCard from '../../../Auxillary/SkeletonCard';
import { useSelector } from 'react-redux';
const Wishlist = () => {
    const productID = useSelector(state => state.wishlist.wishlist)
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const requestProducts = async() => {
            try {
                setloading(true)
                const req = await fetch('https://fakestoreapi.com/products/');
                if(!req.ok){
                    setloading(false)
                    throw new Error('Failed to fetch wishlist Items');
                    setError(error.message)
                }
                const res = await req.json();
                
                setWishlistProducts(res.filter((r) => productID.includes(r.id)))
                setloading(false)
            } catch (error) {
                setError(error.message)
                setloading(false)
            }
        }
        if(productID.length > 0){
            requestProducts();
        } else {
            setError('No wishlist added')
        }
    }, [productID])
    
    const wishlistContent = error ? <h2>{error}</h2> : (
        wishlistProducts.map((w) => <SkuCard 
            key={w.id}
            title={w.title}
            id={w.id} 
            price={w.price}
            image={w.image}
            rating={w.rating} 
            />)
    )
    return (
        <section className="wishlist">
            <Container>
                <Row>
                    <Col sm={12}>
                        <h1>Wishlist</h1>
                    </Col>
                </Row>
                <Row>
                    {loading ? [...new Array(4)].map((a, i) => <SkeletonCard key={i} />) : wishlistContent}
                </Row>
            </Container>
        </section>
    )
}

export default Wishlist;
