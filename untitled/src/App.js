import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Products} from "./pages/Products";
import {Product} from "./pages/Product";
import {NewProduct} from "./pages/NewProduct";
import {NotFound} from "./pages/NotFound";
import {NavBarTop} from "./components/NavbarTop";
import {Account} from "./pages/Account";
import {Login} from "./pages/Login";
import {Cart} from "./pages/Cart";

function App() {
    return (
        <>
            <NavBarTop/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/Login" element={<Login/>}></Route>
                <Route path="/Register" element={<Home/>}></Route>
                <Route path="/Products" element={<Products/>}></Route>
                <Route path="/Products/:id" element={<Product/>}></Route>
                <Route path="/Products/new" element={<NewProduct/>}></Route>
                <Route path="/Account" element={<Account/>}></Route>
                <Route path="/Cart" element={<Cart/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </>

    );
}

export default App;
