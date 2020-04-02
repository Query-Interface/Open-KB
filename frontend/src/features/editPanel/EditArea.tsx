import React, {useState} from 'react';
import { Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './style.css';

interface EditAreaProps {
    content: string;
    placeholder: string;
    saveCallback: (newValue: string) => void;
}

export const EditArea: React.FC<EditAreaProps> = ({content, placeholder, saveCallback}: EditAreaProps) => {
    const [editMode, setEditMode] = useState(false);
    const originalContent = content;
    const [text, setText] = useState(content);
    const elements: Array<JSX.Element> = [];

    const edit = (event: React.MouseEvent): void => {
        setEditMode(true);
        event.preventDefault();
    }
    const save = (event: React.MouseEvent): void => {
        saveCallback(text);
        setEditMode(false);
        event.preventDefault();
    };
    const cancel = (event: React.MouseEvent): void => {
        setText(originalContent);
        setEditMode(false);
        event.preventDefault();
    }

    if (!editMode) {
        if (text) {
            elements.push(<div style={{width:"100%"}} onClick={(event): void => edit(event)} key="contentEdited">{text}</div>);
        } else {
            elements.push(<div style={{width:"100%", opacity:"0.5"}} onClick={(event): void => edit(event)} key="contentEdited">{placeholder}</div>);
        }
    } else {
        elements.push(<Input defaultValue={text} placeholder={placeholder}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setText(event.target.value)} />);
        elements.push(<Button className="btn-section-panel" type="primary" onClick={(event): void => save(event)} key="bt-save">Save</Button>);
        elements.push(<Button className="btn-section-panel" type="default" shape="circle" key="bt-cancel" icon={<CloseOutlined /> } onClick={(event): void=>cancel(event)} />);
    }

    return <React.Fragment>
        {elements}
    </React.Fragment>;
}
