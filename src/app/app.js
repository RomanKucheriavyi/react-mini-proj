import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Game, Calculator, RandomGenerator, NoPage } from "../pages";

const App = () => {

    return(
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/random" element={<RandomGenerator />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;