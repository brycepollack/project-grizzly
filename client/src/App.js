import React from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NoteEditor from './pages/NoteEditor';

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
				<Router>
					<Header />
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/notes/:id' element={<NoteEditor />} />
						</Routes>
					</div>
				</Router>
			</ApolloProvider>
		</>
		
	);
};

export default App;
