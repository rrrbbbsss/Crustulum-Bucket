import React from "react";
// import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="mb-4 py-2 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-right">
                <h1>Crustulum Bucket</h1>
                <nav className="text-center col-6">
                    <>
                        {/*<NavLink activeclassname="active" exact="true" to="/">Home</NavLink>
                        <NavLink activeclassname="active" exact="true" to="/login">Login</NavLink>
                        <NavLink activeclassname="active" exact="true" to="/signup">Sign Up</NavLink>*/}
                        <a>Home</a>
                        <a>Login</a>
                        <a>Sign Up</a>
                    </>
                </nav>
            </div>
        </header>
    );
};

export default Header;