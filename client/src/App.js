import React, { useState, useEffect } from "react";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  HttpLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NoteEditor from "./pages/NoteEditor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const client = new ApolloClient({
  uri: httpLink,
  cache,
  link: from([errorLink, httpLink]),
});

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  useEffect(() => {
    const getUser = () => {
      
      fetch("http://localhost:8080/auth/login/success", {
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
          console.log("User: " + JSON.stringify(resObject.user));
          window.localStorage.setItem("user", JSON.stringify(resObject.user));
          
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  //console.log("App - User: " + JSON.stringify(user));

  // MINOR PROBLEM: ON FIRST LOGIN USER IS STILL REDIRECTED BACK TO LOGIN PAGE

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header user={user} />
            <Routes>
              <Route 
                path="/notes" 
                element={<Home user={user} />} 
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/notes" /> : <Login />}
              />
              <Route
                path="/notes/:id"
                element={user ? <NoteEditor user={user} /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/notes" /> : <Signup />}
              />
            </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
