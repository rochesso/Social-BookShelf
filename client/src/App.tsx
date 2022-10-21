import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';

import SearchBar from './components/GoogleApi/SearchBar';
import Home from './pages/home/Home';
import Navbar from './components/Navbar/Navbar';
import RegisterUser from './pages/registerUser/RegisterUser';
import Login from './pages/login/Login';

import './App.css';


function App() {
    return (
        <Fragment>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<RegisterUser/>}/>
                <Route path="/search" element={<SearchBar/>}/>
            </Routes>

        </Fragment>


    );
}

export default App;
