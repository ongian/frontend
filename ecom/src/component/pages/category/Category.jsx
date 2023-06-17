import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useCategory from '../../../Auxillary/useCategory';
import SkuCard from '../../../Auxillary/SkuCard';
import SkeletonCard from '../../../Auxillary/SkeletonCard';
import Filter from '../../../Auxillary/Filter';
const Category = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [filters, setFilters] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const requestProducts = async() => {
            try {
                setLoading(true)
                const url = params.category === 'all-products' ? 'https://fakestoreapi.com/products/' : `https://fakestoreapi.com/products/category/${params.category}`;
                const req = await fetch(url);
                if(!req.ok){
                    throw new Error('Failed to fetch products!')
                }
                const res = await req.json();
                if(res.length === 0){
                    throw new Error(`We don't have ${params.category} products!`)
                }
                setFilters(res.map((f) => ({category: f.category, price: f.price, rating: f.rating.rate})))
                setProducts(res);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        }
        requestProducts();
    }, [])

    const productDisplay = products ? 
        products.map(p => 
            <SkuCard 
                key={p.id} 
                title={p.title} 
                id={p.id} 
                price={p.price} 
                image={p.image} 
                rating={p.rating}
                medium='4' 
            />) : 
            [... new Array(9)].map((s, i) => <SkeletonCard medium={4} key={i} />
        );

    
    return (
        <section className="category">
            <Container className="pt-5">
                <h1 className="mb-3">
                    {params.category.toUpperCase().replace('-', ' ')}
                </h1>
                <Row>
                    {
                        error ? (<h1>{error}</h1>) : (
                            <>
                                <div className="col-md-3">
                                    <Filter filterProps={filters} />
                                </div>
                                <div className="col-md-9">
                                    <Row>
                                        {productDisplay}
                                    </Row>
                                </div>
                            </>
                        )
                    }
                    
                </Row>
            </Container>
        </section>
    )
}

export default Category;