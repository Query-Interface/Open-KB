import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Card } from './Card';
import { List as ModelList, Card as ModelCard } from '../../api/openkbApi';
import { fetchList, createCard } from './listSlice';
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { EllipsisOutlined, PlusOutlined, SmallDashOutlined } from '@ant-design/icons';

interface ListProps {
    boardId: number;
    listId: number;
    index: number;
}

export const List = ({boardId, listId, index} : ListProps) => {

    const dispatch = useDispatch();
    const list = useSelector((state: RootState) => state.listDetails.listsById[listId]);

    useEffect(() => {
        if (!list) {
            dispatch(fetchList(boardId, listId));
        }

    }, [boardId, listId, dispatch]);

    const renderCardsWithDnd = (cards: Array<ModelCard>) => {
        return <Droppable
             droppableId={`list-drop-${listId}`}
             type="CARD"
             direction="vertical"
             ignoreContainerClipping={false}
             isCombineEnabled={false}>
             {(provided: DroppableProvided) => (
                 <div className="list-cards"
                    ref={provided.innerRef} {...provided.droppableProps}>
                    {cards.map(function(card: ModelCard, index: number) {
                        return <Card card={Object.assign({}, card, {parentList: listId})} index={index} key={`card-${card.id}`} />
                    })}
                    {provided.placeholder}
                 </div>
             )}
         </Droppable>;
    };


    const onAddCard = (event: React.MouseEvent, carId: number) => {
        const newCard = {id: -1, title: "New card", index: list.cards?.length ?? 1};
        dispatch(createCard(boardId, listId, newCard));
    };

    const renderColumnWithDnD = (list: ModelList) => {
        return <Draggable draggableId={`list-drag-${list.id}`} key={list.id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div className="list-column"
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div className="list-container">
                        <div className="list-header" {...provided.dragHandleProps} >
                            <span className="drag-handle"><SmallDashOutlined rotate={90} /></span>
                            <span>{list.title}</span>
                            <div className="btn btn-list-menu"><span><EllipsisOutlined /></span></div>
                            <div className="btn btn-list-add" onClick={e => onAddCard(e, list.id)}><span><PlusOutlined /></span></div>
                        </div>
                        <div className="list-content">
                            {renderCardsWithDnd(list.cards || [])}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    };


    let content = <div className="list-column" key={listId} ></div>;
    if (list) {
        content = renderColumnWithDnD(list);
    }
    return content;
};
export default List;
