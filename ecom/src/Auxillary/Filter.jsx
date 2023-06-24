import React, {useState, useEffect} from 'react'
import InputRange from './InputRange';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setCategories, setRating } from '../component/redux/filterSlice';
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
    }
    const ratingHandler = (r) => {
        dispatch(setRating(r))
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
                {[...Array(5)].map((a, i) => i+1).sort((f, s) => s-f).map((v) => (
                    <label onClick={() => ratingHandler(v)} key={v} >
                        <Rating rate={v} /> {v === 5 ? 5 : v + ' up'}
                    </label>
                ))}
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