import { useState } from "react";

export default function JoinGame({ webSocket }: { webSocket: WebSocket }) {

    const [playername, setPlayerName] = useState("");

    function handleJoinGame(e: React.FormEvent) {
		e.preventDefault();
		console.log(`Joining game, player: ${playername}`);
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