import React from 'react'

const SkeletonCard = ({medium = 3}) => {
    return (
        <div className={`col-xs-12 col-sm-6 col-md-${medium}`}>
            <div className="card is-loading">
                <div className="image"></div>
                <div className="content">
                    <h2></h2>
                    <div className="d-flex align-items-center justify-content-between">
                        <p></p>
                        <p></p>
                    </div>
                    <p></p>
                    <p></p>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <p className="py-4"></p>
                        <p className="py-4"></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard;