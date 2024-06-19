import { Player } from "../models/models"

export default function Lobby({ players, gameId }: { players: Player[], gameId: string }) {

    const playerListItems = players.map(player => <li key={ player.id }>{ player.name }</li>)
    
    const domain = window.location.hostname;
    const port = window.location.port;        
    const gameLink = `http://${domain}:${port}/${gameId}`; 

    return (
        <>
            <h1>Waiting for players...</h1>
            <h2>Number of players: { players.length }</h2>
            <ul>
                { playerListItems }
            </ul>
            <p>Game Link: <b><a href={gameLink}>{gameLink}</a></b></p>
        </>
    )
}