import React, {useState} from 'react'

const SkeletonComponent = ({loading, children}) => {

    if(loading == false){
        return null;
    }
    console.log(loading)
    return (
        <div className="skeleton">
            {children}
        </div>
    )
}

export default SkeletonComponent;

