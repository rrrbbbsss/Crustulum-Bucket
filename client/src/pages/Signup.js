import React
, { useState }
  from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP_USER } from '../utils/mutations';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from "react-router-dom";
import Auth from '../utils/auth';



const SignUp = () => {
  const myStyle = {
    backgroundImage: "url(./images/nasa.jpg)",
    backgroundSize: 'cover',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    zIndex: '99999'
  };

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser, { error }] = useMutation(SIGN_UP_USER);
  const [login, { error1 }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { input: { ...formState } }
      });

      Auth.loggedIn(data.addUser.token);
      console.log(data);
    } catch (e) {
      console.error(e)

    }
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


  return (
    <div style={myStyle} className=" home pb-9">

      <form
        onSubmit={handleFormSubmit}
      >



        {/* <i className=" fa-solid fa-shuttle-space  App-logo fa-2xl " ></i>
                
                <i className="fa-solid fa-infinity fa-xs"></i> */}

        <Link style={{ textDecoration: 'none' }} to="/"><span className="material-symbols-outlined">
          workspaces
        </span></Link>
        <img className='logo2' src="../images/crustulum-bucket.jpg" alt="application logo" />

        <input className='placehold col-9 col-md-3 my-lg-4 mx-md-auto'
          placeholder="Email"
          name='email'
          type='email'
          id='email'
          value={formState.email}
          onChange={handleChange}

<<<<<<< HEAD
=======
                <button  type="submit"  className='button placehold col-9 col-md-3 my-lg-4 mx-md-auto'>Sign Up!</button>
      
    </form>
>>>>>>> develop

          required />


        <input className='placehold col-9 col-md-3 my-lg-4 mx-md-auto'
          placeholder='******'
          name='password'
          type='password'
          id='password'
          value={formState.password}
          onChange={handleChange}


          required />

        <button type="submit" className='button  col-9 col-md-3 my-3 my-lg-4 mx-md-auto'>Sign Up!</button>

      </form>

      {error && <div>Sign up failed</div>}


    </div>
  );
};

export default SignUp;