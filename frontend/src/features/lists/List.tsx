import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'App/rootReducer';
import { Card } from 'Features/card/Card';
import { List as ModelList, Card as ModelCard } from 'Api/openkbApi';
import { fetchList, createCard } from './listSlice';
import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { EllipsisOutlined, PlusOutlined, SmallDashOutlined } from '@ant-design/icons';

interface ListProps {
    boardId: string;
    listId: string;
    index: number;
}

export const List: React.FC<ListProps> = ({boardId, listId, index}: ListProps) => {

    const dispatch = useDispatch();
    const list = useSelector((state: RootState) => state.listDetails.listsById[listId]);

    useEffect(() => {
        if (!list) {
            dispatch(fetchList(boardId, listId));
        }

    }, [boardId, listId, dispatch]);

    const renderCardsWithDnd = (cards: Array<ModelCard>): React.ReactElement => {
        return <Droppable
             droppableId={`list-drop-${listId}`}
             type='CARD'
             direction='vertical'
             ignoreContainerClipping={false}
             isCombineEnabled={false}>
             {(provided: DroppableProvided): React.ReactElement => (
                 <div className='list-cards'
                    ref={provided.innerRef} {...provided.droppableProps}>
                    {cards.map(function(card: ModelCard, index: number) {
                        return <Card card={Object.assign({}, card, {parentList: listId})} index={index} key={`card-${card.id}`} />
                    })}
                    {provided.placeholder}
                 </div>
             )}
         </Droppable>;
    };


    const onAddCard = (event: React.MouseEvent): void => {
        const newCard = {id: '', title: 'New card', index: list.cards?.length ?? 1};
        dispatch(createCard(boardId, listId, newCard));
        event.preventDefault();
    };

    const renderColumnWithDnD = (list: ModelList): React.ReactElement => {
        return <Draggable draggableId={`list-drag-${list.id}`} key={list.id} index={index}>
            {(provided: DraggableProvided): React.ReactElement => (
                <div className='list-column'
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div className='list-container'>
                        <div className='list-header' {...provided.dragHandleProps} >
                            <span className='drag-handle'><SmallDashOutlined rotate={90} /></span>
                            <span>{list.title}</span>
                            <div className='btn btn-list-menu'><span><EllipsisOutlined /></span></div>
                            <div className='btn btn-list-add' onClick={(event): void => onAddCard(event)}><span><PlusOutlined /></span></div>
                        </div>
                        <div className='list-content'>
                            {renderCardsWithDnd(list.cards || [])}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    };


    let content = <div className='list-column' key={listId} ></div>;
    if (list) {
        content = renderColumnWithDnD(list);
    }
    return content;
};
export default List;
