import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Content } from './content';
import { Button } from 'antd';
import { toggleEditPanel } from './editPanelSlice';

export const EditPanel = () => {
    const dispatch = useDispatch();
    const panelContent = useSelector((state:RootState) => state.editPanel.content);
    const card = useSelector((state: RootState) => state.editPanel.selectedCard);

    const renderEditPanelContent = () => {
        switch (panelContent) {
            case Content.EditCard:
            return <span>{card?.title}</span>;
                break;
            default:
                return <span>Put some content</span>;
                break;
        }
    };

    const onCancel = (e: React.MouseEvent) =>  {
        dispatch(toggleEditPanel());
        e.preventDefault();
    };

    return <React.Fragment>
        <div className="edit-panel-header">&nbsp;</div>
        <div className="edit-panel">
            {renderEditPanelContent()}
            <Button>OK</Button>
            <Button onClick={(e) => onCancel(e)}>Cancel</Button>
        </div>
    </React.Fragment>
};

export default EditPanel;
