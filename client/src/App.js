import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import SinglePaste from './pages/SinglePaste';
import Paste from './pages/Paste';
import UpdatePaste from './pages/UpdatePaste';

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
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/paste' element={<Paste />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/paste/:id' element={<SinglePaste />} />
          <Route path='/update-paste/:id' element={<UpdatePaste />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
