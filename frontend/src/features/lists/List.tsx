import React from 'react';

import { Icon } from 'antd';
import { Card } from './Card';
import { List as ModelList, Card as ModelCard } from '../../api/openkbApi';

export const List = (list: ModelList) => {

    const renderCards = (cards: Array<ModelCard>) => {
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

    const onAddCard = (event: React.MouseEvent, carId: number) => {
        return;
    }

    return <div className="list-column" key={list.id} >
            <div className="list-container">
                <div className="list-header">
                    <span>{list.title}</span>
                    <div className="list-header-menu"><span><Icon type="ellipsis" /></span></div>
                </div>
                <div className="list-content">
                    {renderCards(list.cards || [])}
                </div>
                <div className="list-footer add-button"
                    onClick={e => {
                        if (onAddCard)
                            onAddCard(e, list.id);
                        }}>
                    <span><Icon type="plus" /><span> Add another card</span></span>
                </div>
            </div>
        </div>;
};
export default List;
