import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import SignUp from "./SignUp";
import Login from "./Login";
import App from "../App";

const Home = () => {
    return(
        <Router>
            <div>
                <section>
                    <Routes>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/home" element={<App/>}/>
                    </Routes>
                </section>
            </div>
        </Router>
    )
}

export default Home;