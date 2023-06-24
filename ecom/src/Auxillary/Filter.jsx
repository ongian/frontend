import React, {useState, useEffect} from 'react'
import InputRange from './InputRange';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setCategories } from '../component/redux/filterSlice';
import Rating from './Rating';
const Filter = ({filterProps}) => {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        categories: [],
        rates: [],
        prices: []
    });
    
    const [tobeFilter, setTobeFilter] = useState({
        categories: [],
        rates: [],
        prices: []
    })
    useEffect(() => {
        if(filterProps !== null){
            const filterCat = filterProps.map(f => f.category);
            const prices = filterProps.map(f => f.price);
            const countCat = {};
            for(const c of filterCat){
                countCat[c] = (countCat[c] || 0) + 1;
            }
            setFilters((f) => {
                return {
                    ...f,
                    categories: Object.entries(countCat).map(([category, count]) => ({category, count})),
                    prices: [Math.min(...prices), Math.max(...prices)]
                }
            })
        }
    }, [filterProps]);

    const checkboxHandler = (e) => {
        dispatch(setCategories(e.target.value))
        // const catIndex = tobeFilter.categories.indexOf(e.target.value);
        // if(catIndex === -1){
        //     setTobeFilter((pf) => ({
        //         ...pf,
        //         categories: [...pf.categories, e.target.value]
        //     }))
        // } else {
        //     setTobeFilter((pf) => ({
        //         ...pf,
        //         categories: pf.categories.filter(c => c !== e.target.value)
        //     }))
        // }
    }
    const ratingHandler = (r) => {
        setTobeFilter((p) => ({
            ...p,
            rates: r
        }))
    }

    const displayFilters = filters ? (
        <>
            <h3>Filter:</h3>
            <h4>By Category</h4>
            <div className="categories">
                {filters.categories.map(fc => (
                    <label key={fc.category}>
                        <input onChange={checkboxHandler} type="checkbox" value={fc.category} />
                        <span>{fc.category} ({fc.count})</span>
                    </label>
                ))}
            </div>
            <hr />
            <h4>By Price</h4>
            <InputRange min={filters.prices[0]} max={filters.prices[1]} />
            <hr />
            <h4>By ratings</h4>
            <div className="ratings">
                <label onClick={() => ratingHandler(5)}><Rating rate={5} /> 5</label>
                <label onClick={() => ratingHandler(4)}><Rating rate={4} /> 4 up</label>
                <label onClick={() => ratingHandler(3)}><Rating rate={3} /> 3 up</label>
                <label onClick={() => ratingHandler(2)}><Rating rate={2} /> 2 up</label>
                <label onClick={() => ratingHandler(1)}><Rating rate={1} /> 1 up</label>
            </div>
        </>
    ) : null;

    return (
        <div className="filters">
            {displayFilters}
        </div>
    )
}

export default Filter;