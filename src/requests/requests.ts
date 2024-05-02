export interface BaseRequest {
    action: string
    gameRequest: GameRequest
}

export type GameRequest = CreateNewGameRequest;

export interface CreateNewGameRequest {
    playerName: string
}
