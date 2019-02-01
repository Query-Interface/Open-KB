import * as React from 'react';
import {Icon} from 'antd';
import {Card} from './Card';
import { DataSource } from '../../services/DataSource';

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

export interface BoardState {
    lists: Array<ListProps>;
}

export class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);
        this.state = {
            lists: []
        }
    }

    componentDidMount() {
        DataSource.getLists(this.props.id).then(
            value => this.setState({ lists : value}));
    }

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

    private renderLists() {
        let lists = this.state.lists? this.state.lists : [];
        let domElements = lists.map(function(this:Board, item) {
            let cards = item.cards? item.cards : [];
            return <div className="list-column" key={item.id} >
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
                    <div className="new-list add-button" onClick={e => this.handleAddList(e)}>
                        <span><Icon type="plus" /><span> Add another list</span></span>
                    </div>
                </div>
            </div>);
        return domElements;
    }

    private renderCards(cards: Array<CardProps>) {
        if (cards.length != 0) {
            return <div className="list-cards">
                {cards.map(function(card) {
                    return <Card id={card.id} title={card.title} />
                })}
            </div>
        } else {
            return <div></div>;
        }
    }

    handleAddList(event: React.MouseEvent) {
        if (this.props.lists != null) {
            this.props.lists.push({"id": this.props.lists.length.toString(), "title": "new list", "cards": []});
        }
    }

    handleAddCard(event: React.MouseEvent) {
        let target = event.target;
        console.log(target);
    }
}
