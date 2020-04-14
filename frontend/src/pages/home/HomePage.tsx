import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/rootReducer';
import { setCurrentBoard } from 'Features/appSlice';
import { displayEditBoardPanel } from 'Features/editPanel/editPanelSlice';
import { BoardDetails } from 'Api/openkbApi';
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import './style.css';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.appDisplay.boards);

  const createBoard = (event: React.MouseEvent): void => {
    dispatch(displayEditBoardPanel(null));
    event.preventDefault();
  };

  if (boards && boards.length > 0) {
    return (
      <div className="home-board-container">
        <ul className="home-board-list">
          {boards.map((board) => (
            <BoardButton {...board} key={board.id} />
          ))}
          <li
            className="home-board-item"
            onClick={(event: React.MouseEvent): void => {
              createBoard(event);
            }}
          >
            <div className="home-board-item-add">
              <PlusOutlined /> Create a board
            </div>
          </li>
        </ul>
      </div>
    );
  } else {
    return <Empty />;
  }
};

const BoardButton: React.FC<BoardDetails> = ({ id, title }: BoardDetails) => {
  const dispatch = useDispatch();
  const selectBoard = (event: React.MouseEvent, id: string): void => {
    dispatch(setCurrentBoard(id));
    event.preventDefault();
  };

  return (
    <li onClick={(event): void => selectBoard(event, id)}>
      <Link to={`/boards/${id}`} className="home-board-item">
        <div className="home-board-item-text">{title}</div>
      </Link>
    </li>
  );
};

export default HomePage;
