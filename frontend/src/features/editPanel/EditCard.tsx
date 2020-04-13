import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/rootReducer';
import { Collapse }  from 'antd';
import { editCardTitle, editCardDescription } from './editPanelSlice';
import { EditArea } from './EditArea';
const { Panel } = Collapse;
import './style.css';

export const EditCard: React.FC = () => {
    const dispatch = useDispatch();
    const card = useSelector((state: RootState) => state.editPanel.selectedCard);

    const onSaveTitle = (title: string): void => {
        if (card) {
            dispatch(editCardTitle(card, title));
        }
    }

    const onSaveDescription = (desc: string): void => {
        if (card) {
            dispatch(editCardDescription(card, desc));
        }
    }

    return <Collapse defaultActiveKey={['1', '2']} expandIconPosition="right">
        <Panel header={<div className="edit-panel-section-header">Title</div>} key="1">
            <EditArea content={card?.title??''} placeholder={'Set a title'} key={`title-${card?.id}`} saveCallback={onSaveTitle}/>
        </Panel>
        <Panel header={<div className="edit-panel-section-header">Description</div>} key="2">
            <EditArea content={card?.description??""} placeholder={'Set a description'} key={`desc-${card?.id}`} saveCallback={onSaveDescription} />
        </Panel>
    </Collapse>;
};

export default EditCard;