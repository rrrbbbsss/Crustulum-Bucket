import React from "react";
// import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="col-9 col-md-3 mx-md-auto text-center">
            <div className="container flex-row justify-space-between-lg align-center align-right">
                <h1>Crustulum Bucket</h1>
                <nav className="text-center col-6">
                    <>
                        {/*<NavLink activeclassname="active" exact="true" to="/">Home</NavLink>
                        <NavLink activeclassname="active" exact="true" to="/login">Login</NavLink>
                        <NavLink activeclassname="active" exact="true" to="/signup">Sign Up</NavLink>*/}
                        <a>Logout</a>
                    </>
                </nav>
            </div>
        </header>
    );
};

export default Header;