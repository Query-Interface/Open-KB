import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Content } from './content';
import { Button, Layout }  from 'antd';
import { toggleEditPanel } from './editPanelSlice';

const { Sider } = Layout;

export const EditPanel = () => {
    const dispatch = useDispatch();
    const editPanelVisible = useSelector((state:RootState) => state.editPanel.editPanelCollapsed);
    const panelContent = useSelector((state:RootState) => state.editPanel.content);
    const card = useSelector((state: RootState) => state.editPanel.selectedCard);

    const renderEditPanelContent = () => {
        switch (panelContent) {
            case Content.EditCard:
                return <span>{card?.title}</span>;
            default:
                return <span>Put some content</span>;
        }
    };

    const onCancel = (e: React.MouseEvent) =>  {
        dispatch(toggleEditPanel());
        e.preventDefault();
    };

    return <Sider width={400}
                    trigger={null}
                    collapsedWidth={0}
                    collapsible
                    collapsed={editPanelVisible}>
            <div className="edit-panel-header">&nbsp;</div>
            <div className="edit-panel">
                {renderEditPanelContent()}
                <Button>OK</Button>
                <Button onClick={(e: React.MouseEvent) => onCancel(e)}>Cancel</Button>
            </div>
        </Sider>;
};

export default EditPanel;
