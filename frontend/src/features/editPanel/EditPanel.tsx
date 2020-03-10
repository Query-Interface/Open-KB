import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Content } from './content';
import { Collapse, Layout, Empty }  from 'antd';
import { toggleEditPanel } from './editPanelSlice';
import { CloseOutlined } from '@ant-design/icons';
import { EditArea } from './EditArea';
import './style.css';

const { Sider } = Layout;
const { Panel } = Collapse;

export const EditPanel = () => {
    const dispatch = useDispatch();
    const editPanelVisible = useSelector((state:RootState) => state.editPanel.editPanelCollapsed);
    const panelContent = useSelector((state:RootState) => state.editPanel.content);
    const card = useSelector((state: RootState) => state.editPanel.selectedCard);

    const renderEditPanelContent = () => {
        let content:React.ReactElement;
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

    const renderEditCard = () : React.ReactElement => {
        return <Collapse defaultActiveKey={['1', '2']} expandIconPosition="right">
            <Panel header={<div className="edit-panel-section-header">Title</div>} key="1">
                <EditArea content={card?.title??""} key={`title-${card?.id}`}/>
            </Panel>
            <Panel header={<div className="edit-panel-section-header">Description</div>} key="2">
                <EditArea content={card?.description??""} key={`desc-${card?.id}`} />
            </Panel>
        </Collapse>;
    }

    const onCancel = (e: React.MouseEvent) =>  {
        dispatch(toggleEditPanel());
        e.preventDefault();
    };

    return <Sider width={400}
                    trigger={null}
                    collapsedWidth={0}
                    collapsible
                    collapsed={editPanelVisible}>
            <div className="edit-panel-header"><span>Edit panel title</span><div className="btn btn-close-panel"><CloseOutlined onClick={(e) => onCancel(e)}/></div></div>
            <div className="edit-panel">
                {renderEditPanelContent()}

            </div>
        </Sider>;
};

export default EditPanel;
