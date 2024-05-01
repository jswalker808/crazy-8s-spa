import { useEffect, useRef, useState } from 'react';
import './App.css';

const API_GATEWAY_ENDPOINT_URL = process.env.REACT_APP_API_GATEWAY_ENDPOINT_URL as string;

function App() {

	const[gameOwnerName, setGameOwnerName] = useState("");
	const webSocket = useRef<WebSocket | null>(null);

	useEffect(() => {
		webSocket.current = new WebSocket(API_GATEWAY_ENDPOINT_URL);
		webSocket.current.onopen = (event) => {
			console.log(event);
		};
		webSocket.current.onmessage = function (event) {
			console.log(JSON.parse(event.data));
		};
		return () => webSocket.current?.close();
	}, []);

	function handleCreateNewGame(e: React.FormEvent) {
		e.preventDefault();
		const createGameRequest = {
			action: "create_game",
			gameRequest: {
				playerName: gameOwnerName
			}
		};
		webSocket.current?.send(JSON.stringify(createGameRequest));
	}

	function handleGameOwnerNameChange(e: React.FormEvent) {
		setGameOwnerName((e.target as HTMLInputElement).value);
	}

	return (
		<div>
			<h1>Crazy 8's</h1>
			<form onSubmit={handleCreateNewGame}>
				<label>
					Player name: <input onChange={handleGameOwnerNameChange} type="text" value={gameOwnerName} />
				</label>
				<button>Create New Game</button>
			</form>
		</div>
	);
}

export default App;
