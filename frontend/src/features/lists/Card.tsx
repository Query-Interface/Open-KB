import React from 'react';
import { Card as ModelCard } from '../../api/openkbApi';

export const Card = (card: ModelCard) => {
    return <div className="card-details" key={card.id}>
        <div>{card.title}</div>
    </div>;
}

export default Card;
