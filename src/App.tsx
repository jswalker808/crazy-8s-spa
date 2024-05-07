import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewGame from './components/NewGame';
import GameContainer from './components/GameContainer';
import webSocket from './websocket/websocket';


function App() {
	
	useEffect(() => {
		webSocket.onopen = () => {
			console.log("Web socket connection opened");
		};
		webSocket.onclose = () => {
			console.log("Closing web socket connection");
		}
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NewGame webSocket={webSocket}/>} />
				<Route path="/:gameId" element={<GameContainer webSocket={webSocket}/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
