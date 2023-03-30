import { useState, useEffect } from 'react'

import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import Editor from './components/Editor';
import Header from './components/Header';
import Home from "./components/Home";
import NoteEditor from "./components/NoteEditor";

import React from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Notes from './components/Notes.jsx';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				notes: {
					merge(existing, incoming) {
						return incoming;
					}
				}
			}
		}
	}
})

const client = new ApolloClient({
	uri: 'http://localhost:8080/graphql',
	cache
})

const App = () => {

	return (
		<>
			<ApolloProvider client={client}>
				<Header />
				<div className='container'>
					<Notes />
				</div>
			</ApolloProvider>
		</>
		// <BrowserRouter>
		// 	<Routes>
		// 		<Route path="/" element={<Home />} />
		// 		<Route path="/NoteEditor" element={<NoteEditor />} />
		// 		<Route path="/" element={ <><Header /> <Editor /></>} />
		// 	</Routes>
		// </BrowserRouter>
	);
};

export default App;
