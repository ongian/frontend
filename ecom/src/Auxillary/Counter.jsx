import React, { useState, useEffect } from 'react'

const Counter = ({countItem}) => {
    const [itemCount, setItemCount] = useState(1);
    useEffect(() => {
        countItem(itemCount)
        console.log(itemCount)
    }, [itemCount, countItem])
    const addItem = () => {
        setItemCount(prev => prev + 1);
    }

    const substractItem = (e) => {
        if(itemCount > 0){
            setItemCount(prev => prev - 1)
        } else {
            e.preventDefault();
        }
    }

    const onChangeValue = (e) => {
        const value = e.target.value
        setItemCount(isNaN(value) ? 0 : Number(e.target.value))
    }
    
    return (
        <div className="counter d-flex">
            <span onClick={substractItem} className="decrement btn btn-primary">-</span>
            <input value={itemCount} onChange={onChangeValue} />
            <span onClick={addItem} className="increment btn btn-primary">+</span>
        </div>
    )
}

export default Counter;