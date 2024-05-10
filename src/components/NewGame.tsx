import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../contexts";
import { GameState } from "../models/models";

export default function NewGame({ gameState }: { gameState: GameState | null }) {

    const webSocket = useContext(WebSocketContext);
    const [playername, setPlayerName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (gameState) {
            navigate(`/${gameState.gameId}`, { state: gameState });
        }
        return () => {};
	}, [gameState, navigate]);

    function handleCreateNewGame(e: React.FormEvent) {
		e.preventDefault();
		const createGameRequest = {
			action: "create_game",
			gameRequest: {
				playerName: playername
			}
		};
		webSocket?.send(JSON.stringify(createGameRequest));
	}

	function handleGameOwnerNameChange(e: React.FormEvent) {
		setPlayerName((e.target as HTMLInputElement).value);
	}

    return (
        <div>
            <h1>Crazy 8's</h1>
            <form onSubmit={handleCreateNewGame}>
                <label>
                    Player name: <input onChange={handleGameOwnerNameChange} type="text" value={playername} />
                </label>
                <button>Create New Game</button>
            </form>
        </div>
    )
}