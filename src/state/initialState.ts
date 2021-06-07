import { InitialGameState } from "../types/initialGameState";

export const gameState: InitialGameState = {
    currentLine: 0,
    gameWidth: 16,
    gameHeight: 20,
    direction: 'right',
    play: true,
    data: [[0, 3]],
}