import { useState, useEffect } from 'react'

import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddNote from "./components/AddNote";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/AddNote" element={<AddNote />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
