import React, {useState, useEffect, useReducer} from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_MIN_PRICE':
        return {
            ...state,
            price: {
                ...state.price,
                min: action.payload
            }
        };
        case 'UPDATE_MAX_PRICE':
        return {
            ...state,
            price: {
                ...state.price,
                max: action.payload
            }
        };
        case 'UPDATE_MIN_RANGE':
        return {
            ...state,
            rangeStyle: {
                ...state.rangeStyle,
                min: action.payload
            }
        };
        case 'UPDATE_MAX_RANGE':
        return {
            ...state,
            rangeStyle: {
                ...state.rangeStyle,
                max: action.payload
            }
        }
        default:
            return state;
    }
}
const InputRange = ({min, max, getPrice}) => {
    const initilState = {
        price: {
            min: min,
            max: max
        },
        rangeStyle: {
            min: '0%',
            max: '0%'
        }
    };
    const [state, dispatch] = useReducer(reducer, initilState);
    useEffect(() => {
        dispatch({type: 'UPDATE_MIN_PRICE', payload: parseInt(min)});
        dispatch({type: 'UPDATE_MAX_PRICE', payload: parseInt(max)});
    }, [min, max])

    const priceInputEvent = (e) => {
        if (e.target.className === 'input-min'){
            dispatch({type: 'UPDATE_MIN_PRICE', payload: parseInt(e.target.value)})
            dispatch({type: 'UPDATE_MIN_RANGE', payload: (e.target.value / max) * 100 + '%'})
            getPrice(state.price)
        } else {
            dispatch({type: 'UPDATE_MAX_PRICE', payload: parseInt(e.target.value)})
            dispatch({type: 'UPDATE_MAX_RANGE', payload: 100 - (e.target.value / max) * 100 + '%'})
            getPrice(state.price)
        }
    }

    const rangeInputEvent = (e) => {
        if(state.price.max - state.price.min < 10){
            if(e.target.className === 'range-min'){
                dispatch({type: 'UPDATE_MIN_PRICE', payload: price.max - 10});
                getPrice(state.price)
            } else {
                dispatch({type: 'UPDATE_MAX_PRICE', payload: price.min + 10});
                getPrice(state.price)
            }
        } else {
            if(e.target.className === 'range-min'){
                dispatch({type: 'UPDATE_MIN_PRICE', payload: parseInt(e.target.value)})
                dispatch({type: 'UPDATE_MIN_RANGE', payload: (e.target.value / max) * 100 + '%'})
                getPrice(state.price)
            } else {
                dispatch({type: 'UPDATE_MAX_PRICE', payload: parseInt(e.target.value)})
                dispatch({type: 'UPDATE_MAX_RANGE', payload: 100 - (e.target.value / max) * 100 + '%'})
                getPrice(state.price)
            }
        }
        
    }
    
    const minimum_price = state.price.min === undefined ? '' : state.price.min.toString();
    const maximum_price = state.price.max === undefined ? '' : state.price.max.toString();
    console.log(state.price.min)
    return (
        <>
            <div className="price-input">
                <div className="field">
                    <span>Min</span>
                    <input onInput={priceInputEvent} type="number" className="input-min" value={minimum_price} />
                </div>
                <div className="separator">-</div>
                <div className="field">
                    <span>Max</span>
                    <input onInput={priceInputEvent} type="number" className="input-max"  value={maximum_price} />
                </div>
            </div>
            <div className="slider">
                <div className="progress" style={{left: state.rangeStyle.min, right: state.rangeStyle.max}}></div>
            </div>
            <div className="range-input">
                <input onInput={rangeInputEvent} type="range" className="range-min" min={min} max={max}  value={minimum_price} step="1" />
                <input onInput={rangeInputEvent} type="range" className="range-max" min={min} max={max}  value={maximum_price} step="1" />
            </div>
        </>
    )
}

export default InputRange;