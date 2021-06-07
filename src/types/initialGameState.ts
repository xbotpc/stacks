import GameData from "./GameData";

export interface InitialGameState {
    currentLine: number,
    gameWidth: number,
    gameHeight: number,
    direction: 'right' | 'left',
    play: boolean,
    data: GameData
}