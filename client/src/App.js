import React, { useState, useEffect } from "react";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NoteEditor from "./pages/NoteEditor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Folder from "./pages/Folder";
import Landing from "./pages/Landing";

const isDev = false;

const API_BASE_URL = isDev ? 'http://localhost:8080' : 'https://grizzly.fly.dev';
//const API_BASE_URL ='http://localhost:8080';
console.log("APP api base url: " + API_BASE_URL)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        notes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: API_BASE_URL + "/graphql" });

const client = new ApolloClient({
  uri: httpLink,
  cache,
  link: from([errorLink, httpLink]),
  connectToDevTools: true
});

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  
  useEffect(() => {
    const getUser = () => {
      
      fetch( API_BASE_URL + "/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);

          // for persistence
          //console.log("User: " + JSON.stringify(resObject.user));
          window.localStorage.setItem("user", JSON.stringify(resObject.user));
          
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header user={user} isDev={isDev} />
            <Routes>
              <Route 
                path="/"
                element={<Landing />}
              />
              <Route 
                path="/home" 
                element={user ? <Home user={user} /> : <Login isDev={isDev} />} 
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/notes" /> : <Login isDev={isDev} />}
              />
              <Route
                path="/note/:id"
                element={user ? <NoteEditor user={user} /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/notes" /> : <Signup />}
              />
              <Route 
                path="/folder/:id"
                element={user ? <Folder user={user} /> : <Navigate to="/login" />}
              />
            </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
