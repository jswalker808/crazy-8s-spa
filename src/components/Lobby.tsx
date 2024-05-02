import { Player } from "../models/models"

export default function Lobby({ players }: { players: Player[] }) {

    const playerListItems = players.map(player => <li key={ player.id }>{ player.name }</li>)

    return (
        <>
            <h1>Waiting for players...</h1>
            <h2>Number of players: { players.length }</h2>
            <ul>
                { playerListItems }
            </ul>
        </>
    )
}