import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/rootReducer';
import { Collapse } from 'antd';
//import { editBoardTitle, editBoardDescription } from './editPanelSlice';
import { EditArea } from './EditArea';
const { Panel } = Collapse;
import './style.css';

export const EditBoard: React.FC = () => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.editPanel.selectedBoard);

  /*const onSaveTitle = (title: string): void => {
        if (board) {
            dispatch(editBoardTitle(board, title));
        }
    }

    const onSaveDescription = (desc: string): void => {
        if (board) {
            dispatch(editBoardDescription(board, desc));
        }
    }*/

  return (
    <Collapse defaultActiveKey={['1', '2']} expandIconPosition="right">
      <Panel header={<div className="edit-panel-section-header">Board title</div>} key="1">
        <EditArea
          content={board?.title ?? ''}
          placeholder={'Set a title'}
          key={`title-${board?.id}`}
          saveCallback={onSaveTitle}
        />
      </Panel>
      <Panel header={<div className="edit-panel-section-header">Board description</div>} key="2">
        <EditArea
          content={board?.description ?? ''}
          placeholder={'Set a description'}
          key={`desc-${board?.id}`}
          saveCallback={onSaveDescription}
        />
      </Panel>
    </Collapse>
  );
};

export default EditBoard;
