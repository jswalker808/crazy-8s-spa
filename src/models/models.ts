enum GameStatus {
    Pending = "pending",
    InProgress = "in_progress"
}

export interface Card {
    number: number
    color: string
}

export interface Player {
    id: string
    name: string
    points: number
    hand: Card[]
}

export interface GameState {
    gameId: string
    maxPoints: number
    player: Player
    opponents: Player[]
    deck: Card[]
    discardPile: Card[]
    currentTurn: string
    status: GameStatus
}