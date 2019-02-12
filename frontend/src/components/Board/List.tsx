import * as React from 'react';
import { ListProps, CardProps } from './Board';
import {Icon} from 'antd';
import {Card} from './Card';

export class List extends React.Component<ListProps> {

    constructor(props: ListProps) {
        super(props);
    }

    render() {
        return <div className="list-column" key={this.props.id} >
                <div className="list-container">
                    <div className="list-header">
                        <span>{this.props.title}</span>
                        <div className="list-header-menu"><span><Icon type="ellipsis" /></span></div>
                    </div>
                    <div className="list-content">
                        {this.renderCards(this.props.cards || [])}
                    </div>
                    <div className="list-footer add-button"
                        onClick={e => {
                            if (this.props.onAddCard)
                                this.props.onAddCard(e, this.props.id);
                            }}>
                        <span><Icon type="plus" /><span> Add another card</span></span>
                    </div>
                </div>
            </div>
    }

    private renderCards(cards: Array<CardProps>) {
        if (cards.length != 0) {
            return <div className="list-cards">
                {cards.map(function(this:List, card) {
                    return <Card id={card.id} title={card.title} />
                }, this)}
            </div>
        } else {
            return <div></div>;
        }
    }
}
