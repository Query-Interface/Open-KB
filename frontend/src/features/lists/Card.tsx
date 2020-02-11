import React from 'react';
import { Card as ModelCard } from '../../api/openkbApi';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

interface CardProps {
    card: ModelCard;
    index: number;
}

export const Card = ({card, index}: CardProps) => {
    return <Draggable draggableId={`card-${card.id}`} key={card.id} index={index}>
    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div className="card-details"
            ref={provided.innerRef}
            {...provided.draggableProps}>
            <div {...provided.dragHandleProps}>{card.title}</div>
        </div>
    )}
    </Draggable>;
}

export default Card;
