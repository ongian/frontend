import React, {useEffect, useReducer} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPriceMin, setPriceMax } from '../component/redux/filterSlice';

const reducer = (state, action) => {
    switch (action.type) {
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
const InputRange = ({min, max}) => {
    const prices = useSelector(state => state.filters.prices);
    const dispatchRx = useDispatch();
    const initialState = {
        rangeStyle: {
            min: '0%',
            max: '0%'
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatchRx(setPriceMin(min))
        dispatchRx(setPriceMax(max))
    }, [min, max])

    const priceInputEvent = (e) => {
        if (e.target.className === 'input-min'){
            dispatch({type: 'UPDATE_MIN_RANGE', payload: (e.target.value / max) * 100 + '%'})
            
            dispatchRx(setPriceMin(parseInt(e.target.value)))
        } else {
            dispatch({type: 'UPDATE_MAX_RANGE', payload: 100 - (e.target.value / max) * 100 + '%'})
            
            dispatchRx(setPriceMax(parseInt(e.target.value)))
        }
    }

    const rangeInputEvent = (e) => {
        if(prices.max - prices.min < 10){
            if(e.target.className === 'range-min'){
                dispatchRx(setPriceMin(prices.max - 10))
            } else {
                dispatchRx(setPriceMax(prices.min + 10))
            }
        } else {
            if(e.target.className === 'range-min'){
                dispatchRx(setPriceMin(parseInt(e.target.value)))
                dispatch({type: 'UPDATE_MIN_RANGE', payload: (e.target.value / max) * 100 + '%'})
            } else {
                dispatchRx(setPriceMax(parseInt(e.target.value)))
                dispatch({type: 'UPDATE_MAX_RANGE', payload: 100 - (e.target.value / max) * 100 + '%'})
            }
        }
    }
    
    const minimum_price = prices.min === undefined ? '' : prices.min.toString();
    const maximum_price = prices.max === undefined ? '' : prices.max.toString();
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