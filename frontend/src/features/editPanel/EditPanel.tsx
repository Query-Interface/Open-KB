import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/rootReducer';
import { Content } from './content';
import { Layout, Empty }  from 'antd';
import { toggleEditPanel } from './editPanelSlice';
import { CloseOutlined } from '@ant-design/icons';
import './style.css';
import EditCard from './EditCard';
import EditBoard from './EditBoard';

const { Sider } = Layout;

export const EditPanel: React.FC = () => {
    const dispatch = useDispatch();
    const editPanelVisible = useSelector((state: RootState) => state.editPanel.editPanelCollapsed);
    const panelContent = useSelector((state: RootState) => state.editPanel.content);
    const board = useSelector((state: RootState) => state.editPanel.selectedBoard);

    const onCancel = (event: React.MouseEvent): void =>  {
        dispatch(toggleEditPanel());
        event.preventDefault();
    };

    const renderEditPanelContent = (): React.ReactElement => {
        let content: React.ReactElement;
        switch (panelContent) {
            case Content.EditCard:
                content = <EditCard />;
                break;
            case Content.EditBoard:
                content = <EditBoard />;
                break;
            default:
                content = <Empty />
                break;
        }
        return content;
    };

    const getPanelTitle = (): string => {
        let title = 'Edit panel title';
        switch (panelContent) {
            case Content.EditCard:
                title = 'Edit card';
                break;
            case Content.EditBoard:
                title = board ? 'Edit board' : 'Create a board';
                break;
            default:
                break;
        }
        return title;
    }

    return <Sider width={400}
                    trigger={null}
                    collapsedWidth={0}
                    collapsible
                    collapsed={editPanelVisible}>
            <div className="edit-panel-header"><span>{getPanelTitle()}</span><div className="btn btn-close-panel"><CloseOutlined onClick={(event): void => onCancel(event)}/></div></div>
            <div className="edit-panel">
                {renderEditPanelContent()}
            </div>
        </Sider>;
};

export default EditPanel;
