import React, {useState, useEffect} from "react";
import BannerGallery from "../../../Auxillary/BannerGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faHeadset, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Container, Row } from "react-bootstrap";
import SkeletonCard from "../../../Auxillary/SkeletonCard";
import SkuCard from "../../../Auxillary/SkuCard";
import Rating from "../../../Auxillary/Rating";
const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const requestFeaturedProducts = async() => {
            setLoading(true)
            try {
                const req = await fetch('https://fakestoreapi.com/products?limit=8');
                if(!req.ok){
                    throw new Error('Failed to fetch Featured Products!');
                }
                const data = await req.json();
                setFeaturedProducts(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
            
        }
        requestFeaturedProducts()
    }, []);

    let productDisplay = [0,1,2,3,5,6,7,8].map((i) => (<SkeletonCard key={i} />));
    
    if(featuredProducts.length){
        productDisplay = featuredProducts.map((p) => 
            <SkuCard key={p.id} title={p.title} id={p.id} price={p.price} image={p.image} rating={p.rating} />
        )
    }
    return (
        <>
            <section className="masthead">
                <BannerGallery />
            </section>
            <section>
                <Container className="my-5">
                    <Row className="shop-features">
                        <div className="col-sm-12 col-md-4 d-flex align-items-center">
                            <span className="feature-icons">
                                <FontAwesomeIcon icon={faTruck} />
                            </span>
                            <span className="feature-text">
                                <h5>Free Shipping</h5>
                                <p>You will love at great low prices</p>
                            </span>
                        </div>
                        <div className="col-sm-12 col-md-4 d-flex align-items-center my-4">
                            <span className="feature-icons">
                                <FontAwesomeIcon icon={faCreditCard} />
                            </span>
                            <span className="feature-text">
                                <h5>Flexible Payment</h5>
                                <p>Pay with Multiple Credit Cards</p>
                            </span>
                        </div>
                        <div className="col-sm-12 col-md-4 d-flex align-items-center">
                            <span className="feature-icons">
                                <FontAwesomeIcon icon={faHeadset} />
                            </span>
                            <span className="feature-text">
                                <h5>Online Support</h5>
                                <p>24 hours a day, 7 days a week</p>
                            </span>
                        </div>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        {productDisplay}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Home;