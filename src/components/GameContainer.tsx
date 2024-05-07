import Lobby from "./Lobby";
import { GameState } from "../models/models";
import JoinGame from "./JoinGame";

export default function GameContainer({ gameState } : { gameState: GameState | null }) {

    return (
        <>
            {gameState ? <Lobby players={[gameState.player, ...gameState.opponents]}/> : <JoinGame />}
        </>
    )
}