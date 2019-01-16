import * as React from 'react';
import {Icon} from 'antd';

export interface BoardProps {
    id: string;
    title: string;
    description?: string;
    lists?: Array<ListProps>;
}

export interface ListProps {
    id: string;
    title: string;
    tasks?: Array<CardProps>;
}

export interface CardProps {
    id: string;
    title: string;
    description?: string;
    comments?: Array<CommentProps>;
    checklists?: Array<CheckListProps>;
}

export interface CommentProps {
    id: string;
    content: string;
    created?: Date;
    edited?: Date;
}

export interface CheckListProps {
    id: string;
    title: string;
    items: Array<CheckListItemProps>;
}

export interface CheckListItemProps {
    id: string;
    content: string;
    completed: boolean;
}

export class Board extends React.Component<BoardProps, {}> {
    render() {
        return  <div className="content-wrapper">
            <div className="board-header">
                <span>{this.props.title}</span>
            </div>
            <div className="board-overflow">
                <div className="board-container">
                    {this.renderLists()}
                </div>
            </div>
        </div>;
    }

    renderLists() {
        let lists = this.props.lists? this.props.lists : [];
        let domElements = lists.map(function(item) {
            return <div className="list-column"><div className="list-container"><span>{item.title}</span></div></div>
        });
        domElements.push(<div className="list-column"><div className="list-container add-list"><span><Icon type="plus" /><span> Add another list</span></span></div></div>);
        return domElements;
    }
}