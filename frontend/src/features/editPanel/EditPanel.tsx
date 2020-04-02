import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Content } from './content';
import { Collapse, Layout, Empty }  from 'antd';
import { toggleEditPanel, editCardTitle, editCardDescription } from './editPanelSlice';
import { CloseOutlined } from '@ant-design/icons';
import { EditArea } from './EditArea';
import './style.css';

const { Sider } = Layout;
const { Panel } = Collapse;

export const EditPanel: React.FC = () => {
    const dispatch = useDispatch();
    const editPanelVisible = useSelector((state: RootState) => state.editPanel.editPanelCollapsed);
    const panelContent = useSelector((state: RootState) => state.editPanel.content);
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

    const onCancel = (event: React.MouseEvent): void =>  {
        dispatch(toggleEditPanel());
        event.preventDefault();
    };

    const renderEditCard = (): React.ReactElement => {
        return <Collapse defaultActiveKey={['1', '2']} expandIconPosition="right">
            <Panel header={<div className="edit-panel-section-header">Title</div>} key="1">
                <EditArea content={card?.title??''} placeholder={'Set a title'} key={`title-${card?.id}`} saveCallback={onSaveTitle}/>
            </Panel>
            <Panel header={<div className="edit-panel-section-header">Description</div>} key="2">
                <EditArea content={card?.description??""} placeholder={'Set a description'} key={`desc-${card?.id}`} saveCallback={onSaveDescription} />
            </Panel>
        </Collapse>;
    }

    const renderEditPanelContent = (): React.ReactElement => {
        let content: React.ReactElement;
        switch (panelContent) {
            case Content.EditCard:
                content = renderEditCard();
                break;
            default:
                content = <Empty />
                break;
        }
        return content;
    };

    return <Sider width={400}
                    trigger={null}
                    collapsedWidth={0}
                    collapsible
                    collapsed={editPanelVisible}>
            <div className="edit-panel-header"><span>Edit panel title</span><div className="btn btn-close-panel"><CloseOutlined onClick={(event): void => onCancel(event)}/></div></div>
            <div className="edit-panel">
                {renderEditPanelContent()}

            </div>
        </Sider>;
};

export default EditPanel;
