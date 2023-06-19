import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Rating from './Rating';
import { useNavigate, useLocation } from 'react-router-dom';
const SkuCard = ({title, id, price, image, rating, medium = '3'}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const addToWishlist = (id) => {
    let wishlistLS = JSON.parse(localStorage.getItem('wishlist')) || [];
    if(wishlistLS.includes(id)){
      wishlistLS = wishlistLS.filter((w) => w !== id)
    } else {
      wishlistLS.push(id)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlistLS));
    navigate(0);
  }

  const wishlistText = (id) => {
    const wishlistItem = JSON.parse(localStorage.getItem('wishlist')) || [];
    if(location.pathname === '/wishlist') {
      return 'Remove'
    } else {
      return wishlistItem.includes(id) ? 'Remove' : 'Wishlist';
    }
  }
  const ratingDisplay = rating ? (
    <div className="rating d-flex align-items-center justify-content-between">
      <span className="stars">
        <Rating rate={rating.rate} /> {rating.rate}
      </span>
      <span className="count">
        {rating.count} reviews
      </span>
    </div>
  ) : <p>No reviews yet!</p>;
  return (
    <div className={`col-xs-12 col-sm-6 col-md-${medium}`}>
        <div className="sku-card">
            <div className="sku-image">
                <Link to={"/product/" + id}>
                        <img src={image} alt={title} />
                </Link>
            </div>
            <h5>${price}</h5>
            {ratingDisplay}
            <Link to={"/product/" + id} className="sku-title">
                    {title.length > 55 ? title.substring(0, 46) + "..." : title}
            </Link>
            <div className="d-flex align-items-center justify-content-between">
              <Link to={"/product/" + id} className="btn btn-primary">Buy now</Link>
              <Button onClick={() => addToWishlist(id)} variant="secondary">{wishlistText(id)}</Button>
            </div>
        </div>
    </div>
  )
}

export default SkuCard
