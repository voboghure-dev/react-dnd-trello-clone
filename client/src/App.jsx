import React from "react";
import Homepage from "./pages/Homepage";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Header from "./components/Header";

export default function App() {
	return (
		<DndProvider backend={Backend}>
			<Header />
			<Homepage />
		</DndProvider>
	);
}
