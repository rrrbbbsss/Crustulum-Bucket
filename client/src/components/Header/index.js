import React from "react";
import auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
    const logout = event => {
        event.preventDefault();
        auth.logout();
    };

    return (
        <header>
            <div>
                <h1>Crustulum Bucket</h1>
                <nav className="big-nav">
                    {auth.loggedIn() ? (
                    <>
                    <ul>
                       <li><Link className="g-2 big-anc2" to="/">Home</Link></li>
                        <li><a className="g-2 big-anc2" href="/" onClick={logout}>Logout</a></li>
                        <li><Link className="g-2 big-anc2"to="/paste">Create a Paste</Link></li>
                    </ul>
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