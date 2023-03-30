import { useState, useEffect } from 'react'

import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import NoteEditor from "./components/NoteEditor";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/NoteEditor" element={<NoteEditor />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
