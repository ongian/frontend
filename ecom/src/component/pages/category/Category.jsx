import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SkuCard from '../../../Auxillary/SkuCard';
import SkeletonCard from '../../../Auxillary/SkeletonCard';
import Filter from '../../../Auxillary/Filter';
import { useSelector } from 'react-redux';
const Category = () => {
    const filter = useSelector(state => state.filters);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(null);
    // Filters state that passed to each different filter components
    const [filters, setFilters] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
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
    }, []);

    useEffect(() => {
        let filteredByCategories = [];
        let filteredByRates = [];
        let filteredByPrices = [];
        let combinedFilters = [];
        const minPrice = filter.prices.min;
        const maxPrice = filter.prices.max;
        if(filter.categories.length > 0){
            filteredByCategories = products.filter(p => filter.categories.includes(p.category))
        }
        if(filter.rates > 1) {
            filteredByRates = products.filter(p => p.rating.rate > filter.rates)
        }
        // if(minPrice > Math.min(filters.map((f => f.price))) && maxPrice < Math.max(filters.map((f => f.price)))){
        //     console.log('Min Test')
        // }
        combinedFilters = [...filteredByCategories, ...filteredByRates];
        const updatedCombinedFilters = combinedFilters.filter((item, index, arr) => index === arr.findIndex(f => f.id === item.id))
        setFilteredProducts(updatedCombinedFilters);
        
    }, [filter])
    console.log(filteredProducts)
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