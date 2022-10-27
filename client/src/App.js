//  import Login from './pages/Login';
  import SignUp from './pages/Signup';
import './App.css';

function App() {

   const myStyle={
        backgroundImage: "url(./images/nasa.jpg)",
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
  return (
    <div style={myStyle}>
        
      <SignUp/>
      </div>
      
    
  );
};

export default App;
