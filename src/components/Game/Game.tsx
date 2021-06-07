import cx from 'classnames';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../../state/actions';
import { RootState } from '../../state/store';
import GameData from '../../types/GameData';
import styles from './Game.module.scss';


const Game = () => {

    const { gameWidth, gameHeight, direction, play, data } = useSelector((state: RootState) => state.gameReducer);
    const dispatch = useDispatch();

    const moveStackLine = useCallback((dataCopy: GameData, directionCopy: 'left' | 'right', gameWidthCopy) => {
        const _data = dataCopy.concat();
        let _direction = directionCopy;
        let _gameWidth = gameWidthCopy;
        const lastIndexData = _data[_data.length - 1].concat();

        if (lastIndexData[1] === _gameWidth - 1) {
            _direction = 'left';
        } else if (lastIndexData[0] === 0) {
            _direction = 'right';
        }

        if (_direction === 'right' && lastIndexData[1] < _gameWidth) {
            lastIndexData[0] += 1;
            lastIndexData[1] += 1;
        }
        if (_direction === 'left' && lastIndexData[0] > 0) {
            lastIndexData[0] -= 1;
            lastIndexData[1] -= 1;
        }
        _data.splice(_data.length - 1, 1, lastIndexData);
        return { data: _data, direction: _direction };
    }, []);

    const onPauseClick = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            dispatch({
                type: ACTIONS.CHANGE_GAME_STATUS,
                payload: false
            });
        }
    }, [dispatch]);

    useEffect(() => {
        document.addEventListener('keypress', onPauseClick);
        return () => {
            document.removeEventListener('keypress', onPauseClick);
        }
    }, [onPauseClick]);

    useEffect(() => {
        if (play) {
            setTimeout(() => {
                const response = moveStackLine(JSON.parse(JSON.stringify(data)), direction, gameWidth);
                dispatch({ type: ACTIONS.CHANGE_ACTIVE_LINE_START_END_POS, payload: { ...response } });
            }, 200);
        } else {
            const lastIndexData = data[data.length - 1].concat();
            if (lastIndexData[0] !== 0 && lastIndexData[1] !== 3) {
                const _data = data.concat();
                _data.push([0, 3]);
                const ab = _data[_data.length - 2].concat();
                if (direction === 'left') {
                    ab[0] += 1;
                    ab[1] += 1;
                } else {
                    ab[0] -= 1;
                    ab[1] -= 1;
                }
                _data.splice(_data.length - 2, 1, ab);
                dispatch({
                    type: ACTIONS.CHANGE_ACTIVE_LINE_START_END_POS,
                    payload: { data: _data, direction: 'right' }
                });
            } else {
                setTimeout(() => {
                    dispatch({ type: ACTIONS.CHANGE_GAME_STATUS, payload: true });
                }, 200);
            }
        }
    }, [play, direction, moveStackLine, dispatch, data, gameWidth]);

    const renderLine = (startEndIndex: Array<number>) => {
        const columns = [];
        for (let j = 0; j < gameWidth; j++) {
            columns.push(
                <div className={cx(styles.ball, { [styles.active]: j >= startEndIndex[0] && j <= startEndIndex[1] })}></div>
            );
        }
        return columns;
    }

    const renderGame = () => {
        const lines = [];
        for (let i = 0; i < gameHeight; i++) {
            lines.push(
                <div id={i.toString()} className={styles.line}>
                    {renderLine(data[i] || [-1, -1])}
                </div>
            )
        }
        return lines;
    }

    return (
        <>
            <div className={styles.gameContainer}>
                {renderGame()}
            </div>
        </>
    )
}

export default Game
