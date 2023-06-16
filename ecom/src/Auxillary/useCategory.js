import React from "react";
import { useState, useEffect } from "react";

export default function useCategory(){
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const requestCategory = async() => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                if(!response.ok){
                    throw new Error('Request Failed: ' + response.status)
                }
                const data =  await response.json();
                localStorage.setItem('category', JSON.stringify(data))
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
            console.log(JSON.parse(localStorage.getItem('category')))
        }
        if(localStorage.getItem('category') !== null){
            setCategories(JSON.parse(localStorage.getItem('category')))
        } else {
            requestCategory();
        }
    }, [])
    return categories
};