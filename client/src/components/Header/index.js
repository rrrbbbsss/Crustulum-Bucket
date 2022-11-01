import React, { useState, useEffect } from 'react';
import auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
          const [theme, setTheme] = useState('paste-text-dark');
  const toggleTheme = () => {
    if (theme === 'paste-text-dark') {
      setTheme('past-text');
    } else {
      setTheme('paste-text-dark');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

    const logout = event => {
        event.preventDefault();
        auth.logout();
    };
    

    return (
        <div className={`${theme}`}>
        <header >
            <div>
                <img onClick={toggleTheme} src="../images/crustulum-bucket.jpg" alt="application logo"/>
                <nav className={`${theme} big-nav`}>
                    {auth.loggedIn() ? (
                    <>
                    <ul>
                        
                       <li><Link className={`${theme} g-2 big-anc2`} to="/">Home</Link></li>
                        <li><a className={`${theme} g-2 big-anc2`} href="/" onClick={logout}>Logout</a></li>
                        <li><Link className={`${theme} g-2 big-anc2`} to="/paste">Create a Paste</Link></li>
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
        </div>
    );
};

export default Header;