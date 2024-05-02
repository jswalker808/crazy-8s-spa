import { useEffect, useState } from "react";
import Lobby from "./Lobby";
import { GameState } from "../models/models";
import { useLocation } from "react-router-dom";

export default function Game({ webSocket }: { webSocket: WebSocket }) {

    const [gameState, setGameState] = useState<GameState>(useLocation().state);

    useEffect(() => {
        webSocket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);
            setGameState(response);
        };
        return () => {};
	}, [webSocket]);

    return (
        <>
            <Lobby players={[gameState.player, ...gameState.opponents]}/>
        </>
    )
}