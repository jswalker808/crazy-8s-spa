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
}

export interface ActivePlayer extends Player {
    hand: Card[]
}

export interface Opponent extends Player {
    hand: number
}

export interface GameState {
    gameId: string
    maxPoints: number
    player: Player
    opponents: Opponent[]
    deck: Card[]
    discardPile: Card[]
    currentTurn: string
    status: GameStatus
}