import Lobby from "./Lobby";
import { GameState } from "../models/models";
import JoinGame from "./JoinGame";
import { useLocation } from "react-router-dom";

export default function GameContainer({ gameState } : { gameState: GameState | null }) {

    const gameId = useLocation().pathname.slice(1);

    return (
        <>
            {gameState ? <Lobby players={[gameState.player, ...gameState.opponents]} gameId={gameId}/> : <JoinGame gameId={gameId}/>}
        </>
    )
}