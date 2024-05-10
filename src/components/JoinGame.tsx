import { useContext, useState } from "react";
import { WebSocketContext } from "../contexts";

export default function JoinGame({ gameId }: { gameId: string }) {

    const [playername, setPlayerName] = useState("");
    const webSocket = useContext(WebSocketContext);

    function handleJoinGame(e: React.FormEvent) {
		e.preventDefault();
		console.log(`Joining game, player: ${playername}`);
        const joinGameRequest = {
			action: "join_game",
			gameRequest: {
				playerName: playername,
                gameId: gameId
			}
		};
		webSocket?.send(JSON.stringify(joinGameRequest));
	}

	function handlePlayerNameChange(e: React.FormEvent) {
		setPlayerName((e.target as HTMLInputElement).value);
	}

    return (
        <>
            <form onSubmit={handleJoinGame}>
                <label>
                    Player name: <input onChange={handlePlayerNameChange} type="text" value={playername} />
                </label>
                <button>Join Game</button>
            </form>
        </>
    )
}