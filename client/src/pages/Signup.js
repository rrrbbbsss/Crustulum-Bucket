import React
// , { useState } 
from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// import Auth from '../utils/auth';



const SignUp = () => {
//   const [formState, setFormState] = useState({ username: '', email: '', password: '' });
//   const [addUser, { error }] = useMutation(ADD_USER);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async event => {
//   event.preventDefault();

//   try {
//     const { data } = await addUser({
//       variables: { ...formState }
//     });

//     Auth.loggedIn(data.addUser.token);
//     console.log(data);
//   } catch (e) {
//     console.error(e);
//   }
// };

  return (
<div>

    <form
    // onSubmit={handleFormSubmit}
     >
    
            
            
                {/* <i className=" fa-solid fa-shuttle-space  App-logo fa-2xl " ></i>
                
                <i className="fa-solid fa-infinity fa-xs"></i> */}

                <span class="material-symbols-outlined">
                        workspaces
                        </span>
                
            
           
            <input  className='placehold col-9 col-md-3 my-lg-5 mx-md-auto' 
                        placeholder="Username" 
                        name='username'
                        type='username'
                        id='username'
                        // value={formState.username}
                        // onChange={handleChange}
                        
                        
                        required/>
                
                
                <input  className='placehold col-9 col-md-3 my-lg-5 mx-md-auto'
                        placeholder="Email" 
                         name='email'
                        type='email'
                        id='email'
                        // value={formState.email}
                        // onChange={handleChange}
                        
                        
                        required/>

                
                <input  className='placehold col-9 col-md-3 my-lg-5 mx-md-auto' 
                        placeholder='******'
                        name='password'
                        type='password'
                        id='password'
                        // value={formState.password}
                        // onChange={handleChange}
                            
                        
                        required/>

                <button  type="submit"  className='button col-9 col-md-3 my-lg-5 mx-md-auto'>Sign Up!</button>
      
    </form>

    {/* {error && <div>Sign up failed</div>} */}

          
</div>
    );
};

export default SignUp;