import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPriceMin, setPriceMax } from '../component/redux/filterSlice';

const InputRange = ({min, max}) => {
    
    const prices = useSelector(state => state.filters.prices);
    const [range, setRange] = useState({
        min: min,
        max: max
    })
    const [inputPrice, setInputPrice] = useState({
        min: min,
        max: max
    })
    const dispatch = useDispatch();
    
    const updatePriceAndRange = (dataSet, value) => {
        setRange((prev) => {
            return {
                ...prev,
                [dataSet]: dataSet === 'max' ? 100 - (value / max) * 100 + '%' : (value / max) * 100 + '%'
            }
        })
        setInputPrice((prev) => {
            return {
                ...prev,
                [dataSet]: value
            }
        })
    }
    useEffect(() => {
        dispatch(setPriceMin(min))
        dispatch(setPriceMax(max))
        setInputPrice({
            min: min === 'undefined' ? 0 : Number(min).toFixed(),
            max: max === 'undefined' ? 0 : Number(max).toFixed()
        })
    }, [min, max])

    const priceInputEvent = (e) => {
        if (e.target.className === 'input-min'){
            if(e.target.value <= min){
                e.preventDefault()
            } else {
                updatePriceAndRange('min', e.target.value)
            }
        } else {
            if(e.target.value >= max){
                e.preventDefault()
            } else {
                updatePriceAndRange('max', e.target.value)
            }
        }
    }

    const rangeInputEvent = (e) => {
        if(prices.max - prices.min < 10){
            if(e.target.className === 'range-min'){
                dispatch(setPriceMin(prices.max - 10))
            } else {
                dispatch(setPriceMax(prices.min + 10))
            }
        } else {
            if(e.target.className === 'range-min'){
                updatePriceAndRange('min', e.target.value);
            } else {
                updatePriceAndRange('max', e.target.value);
            }
        }
    }
    
    const applyPrice = () => {
        dispatch(setPriceMin(inputPrice.min));
        dispatch(setPriceMax(inputPrice.max));
    }

    const fixed_min_price = min === undefined ? 0 : Number(min).toFixed();
    const fixed_max_price = max === undefined ? 0 : Number(max).toFixed();
    return (
        <>
            <div className="price-input">
                <div className="field">
                    <span>Min</span>
                    <input onInput={priceInputEvent} type="number" className="input-min" value={inputPrice.min} />
                </div>
                <div className="separator">-</div>
                <div className="field">
                    <span>Max</span>
                    <input onInput={priceInputEvent} type="number" className="input-max" value={inputPrice.max} />
                </div>
            </div>
            <div className="slider">
                <div className="progress" style={{left: range.min, right: range.max}}></div>
            </div>
            <div className="range-input">
                <input onInput={rangeInputEvent} type="range" className="range-min" min={fixed_min_price} max={fixed_max_price}  value={inputPrice.min} step="1" />
                <input onInput={rangeInputEvent} type="range" className="range-max" min={fixed_min_price} max={fixed_max_price}  value={inputPrice.max} step="1" />
            </div>
            <div className="price-button">
                <button onClick={applyPrice} type="button" className="btn btn-block btn-primary">Apply</button>
            </div>
        </>
    )
}

export default InputRange;