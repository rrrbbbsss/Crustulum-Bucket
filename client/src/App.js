import Login from './pages/Login';
//  import SignUp from './pages/Signup';
import './App.css';
// import Header from './components/Header';
// import Home from './pages/Home';

function App() {

   const myStyle={
        backgroundImage: "url(./images/nasa.jpg)",
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
  return (
    <div style={myStyle}>
            {/*<div className="App">
      <Header />
      <Home />
    </div>*/}
      <Login/>
      </div>

  );
};

export default App;
