import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeToWishlist } from '../component/redux/wishlistSlice';
const SkuCard = ({title, id, price, image, rating, medium = '3'}) => {

  const wishlists = useSelector(state => state.wishlist.wishlist);

  const dispatch = useDispatch();
  
  const wishlistHandler = (id) => {
    if(wishlists.includes(id)){
      dispatch(removeToWishlist(id))
    } else {
      dispatch(addToWishlist(id))
    }
  }

  const wishlistText = (id) => {
    if(wishlists.includes(id)){
      return 'remove'
    } else {
      return 'wishlist'
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
              <Button onClick={() => wishlistHandler(id)} variant="secondary">{wishlistText(id)}</Button>
            </div>
        </div>
    </div>
  )
}

export default SkuCard
