import React from 'react';
import './navbar.css'
import Logo from '../../assets/img/logo.png'


const Navbar = () => {
    return (
        <div className="header">
            <h1 className="logo"><a href="/#"><img src={Logo} alt="" className=""/></a></h1>
            <ul className="main-nav">
                <li><a href={"/help"}>> Правила</a></li>
                <li><a href={"/signin"}>> Войти</a></li>
                <li><a href={"/signup"}>> Регистрация</a></li>
            </ul>
        </div>

    );
};

export default Navbar;