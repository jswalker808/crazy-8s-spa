import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewGame from './components/NewGame';
import GameContainer from './components/GameContainer';
import { GameState } from './models/models';
import { WebSocketContext } from './contexts';

function App() {

	const [gameState, setGameState] = useState<GameState | null>(null);
	const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
	
	useEffect(() => {
		const ws = new WebSocket(process.env.REACT_APP_API_GATEWAY_ENDPOINT_URL as string);
		ws.onopen = () => {
			console.log('WebSocket connected');
		};
		ws.onmessage = (event) => {
			const response = JSON.parse(event.data);
			console.log(response);
			if (response?.message !== "Internal server error") {
				setGameState(response);
			}
		};
		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
		ws.onclose = () => {
			console.log('WebSocket closed');
		};

		setWebSocket(ws);

		return () => {
			ws.close();
		};
	}, []);

	return (
		<BrowserRouter>
			<WebSocketContext.Provider value={webSocket}>
				<Routes>
					<Route path="/" element={<NewGame gameState={gameState}/>} />
					<Route path="/:gameId" element={<GameContainer gameState={gameState}/>} />
				</Routes>
			</WebSocketContext.Provider>
		</BrowserRouter>
	);
}

export default App;
