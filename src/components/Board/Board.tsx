import * as React from 'react';
import {Icon} from 'antd';

export interface BoardProps {
    id: number;
    title: string;
    description?: string;
    lists?: Array<ListProps>;
}

export interface ListProps {
    id: string;
    title: string;
    cards?: Array<CardProps>;
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
        let domElements = lists.map(function(this:Board, item) {
            let cards = item.cards? item.cards : [];
            return <div className="list-column">
                <div className="list-container">
                    <div className="list-header">
                        <span>{item.title}</span>
                        <div className="list-header-menu"><span><Icon type="ellipsis" /></span></div>
                    </div>
                    <div className="list-content">
                        {this.renderCards(cards)}
                    </div>
                    <div className="list-footer add-button">
                        <span><Icon type="plus" /><span> Add another card</span></span>
                    </div>
                </div>
            </div>
        }, this);
        domElements.push(
            <div className="list-column">
                <div className="list-container">
                    <div className="new-list add-button">
                        <span><Icon type="plus" /><span> Add another list</span></span>
                    </div>
                </div>
            </div>);
        return domElements;
    }

    renderCards(cards: Array<CardProps>) {
        if (cards.length != 0) {
            return <div className="list-cards">
                {cards.map(function(this:CardProps, card) {
                    return <div className="card-details">
                            <div>{card.title}</div>
                        </div>
                }, this)}
            </div>
        } else {
            return <div></div>;
        }
    }
}
