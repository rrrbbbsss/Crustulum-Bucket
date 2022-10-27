import React from 'react';


const Login = () => {
return (
<form  >
    
    <span class="fa-stack fa-2x">
       
        <i class=" fa-solid fa-shuttle-space  App-logo fa-2xl " ></i>
        
        
    
     </span>
    
        
        
        <input  className='placehold col-9 col-md-3 my-lg-5 mx-md-auto' type="text" placeholder="Username"  required/>

        
        <input  className='placehold col-9 col-md-3 my-lg-5 mx-md-auto' type="password" placeholder="Password"  required/>

        <button  type="submit"  className='button col-9 col-md-3 my-lg-5 mx-md-auto'>Sign In</button>
      
    

    
        
        
    
</form>
    );
};

export default Login;