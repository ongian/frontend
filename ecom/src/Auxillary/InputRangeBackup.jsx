import React, {useState, useEffect} from 'react'

const reducer = (state, action) => {

}
const InputRange = ({min, max, getPrice}) => {
    useEffect(() => {
        setPrice({
            min: parseInt(min),
            max: parseInt(max)
        })
    }, [min, max])
    const [price, setPrice] = useState({
        min: parseInt(min),
        max: parseInt(max)
    });
    const [rangeStyle, setRangeStyle] = useState({
        min: '0%',
        max: '0%'
    })

    const priceInputEvent = (e) => {
        if (e.target.className === 'input-min'){
            setPrice((p) => ({
                ...p,
                min: parseInt(e.target.value)
            }));
            setRangeStyle((r) => ({
                ...r,
                min: (e.target.value / max) * 100 + '%'
            }))
            getPrice(price)
        } else {
            setPrice((p) => ({
                ...p,
                max: parseInt(e.target.value)
            }));
            setRangeStyle((r) => ({
                ...r,
                max: 100 - (e.target.value / max) * 100 + '%'
            }))
            getPrice(price)
        }
    }

    const rangeInputEvent = (e) => {
        if(price.max - price.min < 10){
            if(e.target.className === 'range-min'){
                setPrice((p) => ({
                    ...p,
                    min: price.max - 10
                }))
                getPrice(price)
            } else {
                setPrice((p) => ({
                    ...p,
                    max: price.min + 10
                }))
                getPrice(price)
            }
        } else {
            if(e.target.className === 'range-min'){
                setPrice((p) => ({
                    ...p,
                    min: parseInt(e.target.value)
                }))
                setRangeStyle((r) => ({
                    ...r,
                    min: (e.target.value / max) * 100 + '%'
                }))
                getPrice(price)
            } else {
                setPrice((p) => ({
                    ...p,
                    max: parseInt(e.target.value)
                }));
                setRangeStyle((r) => ({
                    ...r,
                    max: 100 - (e.target.value / max) * 100 + '%'
                }))
                getPrice(price)
            }
        }
        
    }
    
    return (
        <>
            <div className="price-input">
                <div className="field">
                    <span>Min</span>
                    <input onInput={priceInputEvent} type="number" className="input-min" value={price.min.toString()} />
                </div>
                <div className="separator">-</div>
                <div className="field">
                    <span>Max</span>
                    <input onInput={priceInputEvent} type="number" className="input-max"  value={price.max.toString()} />
                </div>
            </div>
            <div className="slider">
                <div className="progress" style={{left: rangeStyle.min, right: rangeStyle.max}}></div>
            </div>
            <div className="range-input">
                <input onInput={rangeInputEvent} type="range" className="range-min" min={min} max={max}  value={price.min.toString()} step="1" />
                <input onInput={rangeInputEvent} type="range" className="range-max" min={min} max={max}  value={price.max.toString()} step="1" />
            </div>
        </>
    )
}

export default InputRange;