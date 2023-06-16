import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarThin} from '@fortawesome/free-regular-svg-icons';

const Rating = ({rate}) => {
    const solidStar = <FontAwesomeIcon icon={faStar} />;
    const emptyStar = <FontAwesomeIcon icon={faStarThin} />;
    const halfStar = <FontAwesomeIcon icon={faStarHalfStroke} />;
    const rateArray = [1,2,3,4,5];
    
    //rate = 4.2
    //Math.round(4.2) === 4
    // 4.1
    
    const displayRating = rateArray.map(
        (ra) => rate >= ra ? 
            <FontAwesomeIcon icon={faStar} key={ra} /> : 
            (Math.round(rate) >= ra ? 
            <FontAwesomeIcon icon={faStarHalfStroke} key={ra} /> : 
            <FontAwesomeIcon icon={faStarThin} key={ra}/>)
        );
    
    return (
        <>
            {displayRating}
        </>
    )
}

export default Rating;