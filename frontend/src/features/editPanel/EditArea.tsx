import React, {useState} from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './style.css';

interface EditAreaProps {
    content: string;
}

export const EditArea = ({content}:EditAreaProps) => {
    const [editMode, setEditMode] = useState(false);
    let elements: Array<JSX.Element> = [];
    const toggle = (e: React.MouseEvent) => {
        setEditMode(!editMode);
    };

    if (!editMode) {
        elements.push(<div style={{width:"100%"}} onClick={(e)=>toggle(e)}>{content}</div>);
    } else {
        elements.push(<div contentEditable style={{width:"100%"}}>{content}</div>);
        elements.push(<Button className="btn-section-panel" type="primary" onClick={(e)=>toggle(e)}>Save</Button>);
        elements.push(<Button className="btn-section-panel" type="default" shape="circle" icon={<CloseOutlined />} onClick={(e)=>toggle(e)} />);
    }

    return <React.Fragment>
        {elements}
    </React.Fragment>;
}
