import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayEditCardPanel } from 'Features/editPanel/editPanelSlice';
import { RootState } from 'App/rootReducer';
import { EditOutlined } from '@ant-design/icons';
import { Card as ModelCard } from 'Api/openkbApi';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import './style.css';

interface CardProps {
  card: ModelCard;
  index: number;
}

export const Card: React.FC<CardProps> = ({ card, index }: CardProps) => {
  const dispatch = useDispatch();
  const isSelected = card.id === useSelector((state: RootState) => state.editPanel.selectedCard?.id ?? '');

  const onEditCard = (event: React.MouseEvent): void => {
    dispatch(displayEditCardPanel(card));
    event.preventDefault();
  };

  return (
    <Draggable draggableId={`card-${card.id}`} index={index}>
      {(provided: DraggableProvided): React.ReactElement => (
        <div
          className={`card-details${isSelected ? ' card-selected' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>{card.title}</div>
          <div style={{ position: 'relative' }}>
            <div className="btn btn-card-edit" onClick={(event): void => onEditCard(event)}>
              <span>
                <EditOutlined />
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
