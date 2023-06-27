import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import useCategory from "./useCategory";
import { Link } from "react-router-dom";
import electronics from '../images/electronics.jpg';
import jewelery from '../images/jewelery.jpg';
import mensclothing from '../images/mens-clothing.jpg';
import womensclothing from '../images/womens-clothing.jpg';
const BannerGallery = () => {
    const categories = useCategory();
    let [activeBanner, setActiveBanner] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBanner((prev) => (prev === categories.length-1 ? 0 : prev + 1));
        }, 5000);
        return () => {clearInterval(interval)}
        
    }, [activeBanner]);

    
    const initialBanner = (
        <div className="electronics">
            <Container>
                <h4>
                    End of Season Sale
                </h4>
                <Link className="btn btn-primary" to="/category/electronics/">Shop now</Link>
            </Container>
        </div>
    );

    const indicatorOnClick = (i) => {
        setActiveBanner(i);
        console.log(activeBanner)
    }
    let imageBanner = (category) => {
        if(category === 'electronics') {
            return `url(${electronics})`
        } else if(category === 'jewelery'){
            return `url(${jewelery})`
        } else if(category === "men's clothing"){
            return `url(${mensclothing})`
        } else {
            return `url(${womensclothing})`
        }
    }
    console.log(categories)
    const mapBanners = categories ? (
        <>
            {
                categories.map((c, i) =>
                    (
                        <div key={c} className={i === activeBanner ? 'active' : null} style={{backgroundImage: imageBanner(c)}}>
                            <div className="overlay"></div>
                            <Container>
                                <h4>{c.toUpperCase()}</h4>
                                <Link className="btn btn-primary" to={"/category/" + c}>Shop now</Link>
                            </Container>
                        </div>
                    )
                )
                
            }
            <ol>
                {
                    categories.map((c, i) => (
                        <li key={c} onClick={() => indicatorOnClick(i)} className={i === activeBanner ? 'active' : null}>{i}</li>
                    ))
                }
            </ol>
        </>
    ) : initialBanner;

    const mapIndicator = () => {

    }
    return <div className="banner-slider">
        {mapBanners}
    </div>
}

export default BannerGallery;