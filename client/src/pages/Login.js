import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';



const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { input: { ...formState } }
      });
      Auth.login(data.login.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  const myStyle = {
    backgroundImage: "url(./images/nasa.jpg)",
    backgroundSize: 'cover',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    zIndex: '99999'
  };

  return (
    <div style={myStyle} className="pb-9">

      <form
        onSubmit={handleFormSubmit}
      >



        {/* <i className=" fa-solid fa-shuttle-space  App-logo fa-2xl " ></i>
                
                <i className="fa-solid  fa-infinity fa-xs"></i> */}
        <span className="material-symbols-outlined">
          workspaces
        </span>

        <input className='placehold col-9 col-md-3 my-lg-5 mx-md-auto'
          type="email"
          placeholder="Email"
          name='email'
          id='email'
          value={formState.email}
          onChange={handleChange}

          required />


        <input className='placehold col-9 col-md-3 my-lg-5 mx-md-auto'
          placeholder='******'
          name='password'
          type='password'
          id='password'
          value={formState.password}
          onChange={handleChange}

          required />

        <button type="submit" className='button col-9 col-md-3 my-lg-5 mx-md-auto'>Sign In</button>

      </form>

      <Link to="/signup"><button type="submit" className='Sign-up button col-9 col-md-3 my-lg-5 mx-md-auto'>Create Account</button></Link>

      {error && <div>Login failed</div>}
      {/* DONATE HERE */}
    </div>



  );
};

export default Login;