import Login from './pages/Login';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {


  return (
    <ApolloProvider client={client}>
      <div>
        <div className="App">
          <Home/>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
