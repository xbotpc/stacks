import { InitialGameState } from "../../types/initialGameState";
import { ACTIONS } from '../actions';
import { gameState } from "../initialState";
interface Action {
    type: string,
    payload: any
}

const gameReducer = (state = gameState, { type = '', payload }: Action): InitialGameState => {
    switch (type) {
        case ACTIONS.CHANGE_ACTIVE_LINE_START_END_POS:
            return {
                ...state,
                ...payload
            }

        case ACTIONS.CHANGE_DIRECTION:
            return {
                ...state,
                direction: payload
            }

        case ACTIONS.CHANGE_GAME_STATUS:
            return {
                ...state,
                play: payload
            }
        default:
            return state;
    }
}

export default gameReducer;