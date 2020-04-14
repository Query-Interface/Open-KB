import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/rootReducer';
import { fetchBoards } from 'Features/appSlice';
import Board from 'Components/Board/Board';

const BoardPage: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.appDisplay.boards);
  const boardSelected = useSelector((state: RootState) => state.appDisplay.boardId);

  useEffect(() => {
    if (boards.length === 0) {
      dispatch(fetchBoards());
    }
  }, [dispatch]);

  const renderBoard = (): JSX.Element => {
    if (boards.length > 0) {
      let selectedBoard = boards.find((b) => b.id === boardSelected);
      if (!selectedBoard) {
        selectedBoard = boards.find((b) => b.title === 'Kanban');
        if (!selectedBoard) {
          selectedBoard = boards[0];
        }
      }

      return <Board boardId={selectedBoard.id} />;
    }
    return <div>&nbsp;</div>;
  };

  return renderBoard();
};
export default BoardPage;
