import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/rootReducer';
import { createBoard, setCurrentBoard } from 'Features/appSlice';
import { displayEditBoardPanel } from 'Features/editPanel/editPanelSlice';
import { BoardDetails } from 'Api/openkbApi';
import { Button, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import './style.css';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.appDisplay.boards);

  const onCreateBoard = (event: React.MouseEvent): void => {
    dispatch(createBoard());
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
              onCreateBoard(event);
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
    return <Empty imageStyle={{
                  paddingTop: "50px",
                }}
                description={
                  <span>Hey! Why not creating your first board ?</span>
                }>
            <Button type="primary" onClick={(event: React.MouseEvent): void => onCreateBoard(event)}>Create Now</Button>
      </Empty>;
  }
};

const BoardButton: React.FC<BoardDetails> = ({ id, title, description }: BoardDetails) => {
  const dispatch = useDispatch();
  const selectBoard = (event: React.MouseEvent, id: string): void => {
    dispatch(setCurrentBoard(id));
    event.preventDefault();
  };

  return (
    <li onClick={(event): void => selectBoard(event, id)}>
      <Link to={`/boards/${id}`} className="home-board-item">
        <div className="home-board-item-text">{title}</div>
        {description ? <div className="home-board-item-desc">{description}</div>:""}
      </Link>
    </li>
  );
};

export default HomePage;
