import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Rating from './Rating';

const SkuCard = ({title, id, price, image, rating, medium = '3'}) => {
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
              <Button variant="secondary">Wishlist</Button>
            </div>
        </div>
    </div>
  )
}

export default SkuCard
