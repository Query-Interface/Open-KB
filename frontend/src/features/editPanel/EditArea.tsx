import React, {useState} from 'react';
import { Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './style.css';

interface EditAreaProps {
    content: string;
}

export const EditArea = ({content}:EditAreaProps) => {
    const [editMode, setEditMode] = useState(false);
    const originalContent = content;
    const [text, setText] = useState(content);
    let elements: Array<JSX.Element> = [];

    const edit = (e: React.MouseEvent) => {
        setEditMode(true);
        e.preventDefault();
    }
    const save = (e: React.MouseEvent) => {
        // TODO save
        setEditMode(false);
        e.preventDefault();
    };
    const cancel = (e: React.MouseEvent) => {
        setText(originalContent);
        setEditMode(false);
        e.preventDefault();
    }

    if (!editMode) {
        elements.push(<div style={{width:"100%"}} onClick={(e)=>edit(e)} key="contentEdited">{text}</div>);
    } else {
        elements.push(<Input defaultValue={text} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)} />);
        elements.push(<Button className="btn-section-panel" type="primary" onClick={(e)=>save(e)}>Save</Button>);
        elements.push(<Button className="btn-section-panel" type="default" shape="circle" icon={<CloseOutlined />} onClick={(e)=>cancel(e)} />);
    }

    return <React.Fragment>
        {elements}
    </React.Fragment>;
}
