import React from 'react';
import { useDispatch } from 'react-redux';
import { displayEditCardPanel } from '../editPanel/editPanelSlice';
import { EditOutlined } from '@ant-design/icons';
import { Card as ModelCard } from '../../api/openkbApi';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

interface CardProps {
    card: ModelCard;
    index: number;
}

export const Card = ({card, index}: CardProps) => {
    const dispatch = useDispatch();

    const onEditCard = (event: React.MouseEvent) => {
        dispatch(displayEditCardPanel(card));
        event.preventDefault();
    };

    return <Draggable draggableId={`card-${card.id}`} index={index}>
    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div className="card-details"
            ref={provided.innerRef}
            {...provided.draggableProps}>
            <div {...provided.dragHandleProps}>{card.title}</div>
            <div style={{position: "relative"}}>
                <div className="btn btn-card-edit" onClick={(e) => onEditCard(e)}><span><EditOutlined /></span></div>
            </div>
        </div>
    )}
    </Draggable>;
}

export default Card;
