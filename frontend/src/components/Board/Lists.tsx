import * as React from 'react';
import {Icon} from 'antd';
import { ListProps } from './Board';
import { List } from './List';

interface ListsProps {
    lists?: Array<ListProps>;
    onAddList: (event: React.MouseEvent) => any;
    onAddCard: (event: React.MouseEvent, listId: string) => void;
}

export class Lists extends React.Component<ListsProps> {

    constructor(props: ListsProps) {
        super(props);
    }

    render() {
        let lists = this.props.lists? this.props.lists : [];
        let domElements = lists.map(function(this:Lists, item) {
            return this.renderList(item);
        }, this);
        domElements.push(
            <div className="list-column">
                <div className="list-container">
                    <div className="new-list add-button" onClick={e => this.props.onAddList(e)}>
                        <span><Icon type="plus" /><span> Add another list</span></span>
                    </div>
                </div>
            </div>);
        return domElements;
    }

    renderList(list: ListProps) {
        let cards = list.cards? list.cards : [];
        return <List id={list.id} title={list.title} cards={cards} onAddCard={this.props.onAddCard} />
    }
}
