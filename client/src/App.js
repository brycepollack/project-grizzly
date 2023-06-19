import React, { useState, useEffect } from "react";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
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

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache,
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
          console.log(JSON.stringify(resObject.user));
          window.localStorage.setItem("user", JSON.stringify(resObject.user));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log(user);

  // MINOR PROBLEM: ON FIRST LOGIN USER IS STILL REDIRECTED BACK TO LOGIN PAGE

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header user={user} />
            <Routes>
              <Route path="/notes" element={<Home />} />
              <Route
                path="/login"
                element={user ? <Navigate to="/notes" /> : <Login />}
              />
              <Route
                path="/notes/:id"
                element={user ? <NoteEditor /> : <Navigate to="/login" />}
              />
            </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
