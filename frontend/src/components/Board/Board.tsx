import * as React from 'react';
import { DataSource } from '../../services/DataSource';
import { Lists } from './Lists';

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
    onAddCard?: (event: React.MouseEvent, loadId:string) => void;
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
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
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
        return <Lists lists={lists} onAddCard={this.handleAddCard} onAddList={this.handleAddList} />
    }

    handleAddList(event: React.MouseEvent) {
        let lists = this.state.lists.slice();
        lists.push({"id": lists.length.toString(), "title": "new list", "cards": []});
        this.setState({ lists : lists});
        event.preventDefault();
    }

    handleAddCard(event: React.MouseEvent, listId: string) {
        let lists = this.state.lists.slice();
        let cards = (lists.filter(l => l.id === listId)[0].cards || []).slice();
        cards.push({"id": cards.length.toString(), "title": "My new card", "description": "A new default card. You can edit its content."});
        lists.filter(l => l.id === listId)[0].cards = cards;
        this.setState({lists : lists});
        event.preventDefault();
    }
}
