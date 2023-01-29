import React from "react";
import { Link } from "react-router-dom";
import "./NoPage.css";

const NoPage = () => {
    return (
        <div className="no-page">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The Page you are looking for doesn't exist or an other error occured. Go to <Link to="/">Home</Link></p>
        </div>
    );
};

export default NoPage;