import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoardDetails } from '../../features/board/boardsDetailSlice';
import { RootState } from '../../app/rootReducer';
import { Empty, Spin } from 'antd';
import { BoardLists } from '../../features/lists/Lists';

interface BoardProps {
    boardId: number
}

const Board = ({boardId} : BoardProps) => {
    const dispatch = useDispatch();
    const board = useSelector((state:RootState) => state.boards.boardsById[boardId]);
    const isLoading = useSelector((state:RootState) => state.boards.isLoading);

    useEffect(() => {
        if (!board) {
            dispatch(fetchBoardDetails(boardId));
        }

    }, [boardId, dispatch]);

    function renderLists() {
        return <BoardLists boardId={boardId} />;
    };

    let content;
    if (!isLoading && board) {
        content = <div className="content-wrapper">
                <div className="board-header">
                    <span>{board.title}</span>
                </div>
                <div className="board-overflow">
                    <div className="board-container">
                        {renderLists()}
                    </div>
                </div>
            </div>;
    } else if (isLoading) {
        content = <div style={{textAlign:"center", marginTop:"250px"}}>
            <Spin size="large" />
        </div>;
    } else {
        content = <Empty />;
    }
    return content;
};

export default Board;
