import React from "react";
import auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
    const logout = event => {
        event.preventDefault();
        auth.logout();
    };

    return (
        <header className="col-9 col-md-3 mx-md-auto text-center">
            <div className="container flex-row justify-space-between-lg align-center align-right">
                <h1>Crustulum Bucket</h1>
                <nav className="text-center col-6">
                    {auth.loggedIn() ? (
                    <>
                        <Link to="/">Home</Link>
                        <a href="/" onClick={logout}>Logout</a>
                        <Link to="/paste">Create a Paste</Link>
                    </>
                    ) : (
                        <>
                            <Link to='/'>Home</Link>
                            <Link to='/signup'>Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;