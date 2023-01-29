import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <button><Link to="/game">Game</Link></button>
            <button><Link to="/calculator">Calculator</Link></button>
            <button><Link to="/random">RandomGenerator</Link></button>
        </div>
    );
};

export default Home;