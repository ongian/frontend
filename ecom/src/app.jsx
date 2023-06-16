import React from 'react';
import {createRoot} from 'react-dom/client';
import { Header } from './component/Header';
import Home from './component/pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './component/pages/category/Category';
import './bootstrap.min.css';
import './style.css';
import Product from './component/pages/product/Product';
import Footer from './component/Footer';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/category/:category" element={<Category />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
    
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);