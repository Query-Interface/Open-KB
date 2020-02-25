import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoardDetails } from '../../features/board/boardsDetailSlice';
import { RootState } from '../../app/rootReducer';
import { Empty, Spin, Icon } from 'antd';
import { fetchLists, createList, updateListOrder } from '../../features/lists/listsSlice';
import { updateCardOrder, moveCard } from '../../features/lists/listSlice';
import { List } from '../../api/openkbApi';
import { List as UIList } from '../../features/lists/List';
import { Droppable, DroppableProvided, DragDropContext, DropResult, DraggableId, DroppableId } from 'react-beautiful-dnd';

interface BoardProps {
    boardId: number
}

const Board = ({boardId} : BoardProps) => {
    const dispatch = useDispatch();
    const board = useSelector((state:RootState) => state.boards.boardsById[boardId]);
    const isLoading = useSelector((state:RootState) => state.boards.isLoading);
    const lists = useSelector((state: RootState) => state.listsDetails.lists);

    useEffect(() => {
        if (!board) {
            dispatch(fetchBoardDetails(boardId));
        }
        if (!lists) {
            dispatch(fetchLists(boardId));
        }

    }, [boardId, dispatch]);

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        if (result.type === "CARD") {
            const cardId = getCardIdByDraggableId(result.draggableId);
            if (result.source.droppableId === result.destination.droppableId) {
                // case 1: move card in the same list (simple swapping of items)
                const list = getListByDroppableId(lists ?? [], result.source.droppableId);
                if (list && cardId) {
                    dispatch(updateCardOrder(boardId, list.id, cardId, result.source?.index, result.destination?.index));
                }
            } else {
                // case 2: move card into another list (need to remove card from source list, then add to destination list)
                const listSource = getListByDroppableId(lists ?? [], result.source.droppableId);
                const listDestination = getListByDroppableId(lists ?? [], result.destination.droppableId);
                if (listSource && listDestination && cardId) {
                    dispatch(moveCard(boardId, listSource.id, listDestination.id, cardId, result.source.index, result.destination.index));
                }
            }
        } else if (result.type === "LIST") {
            if (lists) {
                dispatch(updateListOrder(boardId, lists, result.source?.index, result.destination?.index));
            }
        }
    };

    const getListByDroppableId = (lists: Array<List>, dropId: DroppableId) : List | undefined => {
        let result : List | undefined;
        if (dropId) {
            result = lists.find( l => dropId === `list-drop-${l.id}`);
        }
        return result;
    }

    const getCardIdByDraggableId = (dragId: DraggableId) : number  | undefined => {
        let result : number | undefined;
        if (dragId) {
            const sId = dragId.substring('card-'.length);
            if (sId) {
                result = Number.parseInt(sId);
            }
        }
        return result;
    };


    const onAddList = (event: React.MouseEvent) => {
        let newList = {id:-1, title: "new list", index:(lists?.length??0)+1, cards: []};
        dispatch(createList(boardId, newList));
    };

    const renderLists = (lists: Array<List>) : Array<JSX.Element> => {
        let content: Array<JSX.Element> = [];
        if (lists) {
            content = lists.map(function(item: List, index: number) {
                return <UIList boardId={boardId} listId={item.id} index={index}/>;
            })
        }
        return content;
    }

    function renderBoardWithDnd() {
       return  <DragDropContext onDragEnd={onDragEnd}>
       <Droppable
            droppableId="board"
            type="LIST"
            direction="horizontal"
            ignoreContainerClipping={false}
            isCombineEnabled={false}
        >
            {(provided: DroppableProvided) => (
                <div className="board-container"
                    ref={provided.innerRef} {...provided.droppableProps}>
                    {renderLists(lists ?? [])}
                    {provided.placeholder}
                    <div className="list-column">
                        <div className="list-container">
                            <div className="new-list add-button" onClick={e => onAddList(e)}>
                                <span><Icon type="plus" /><span> Add another list</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
        </DragDropContext>;
    }

    let content;
    if (!isLoading && board) {
        content = <div className="content-wrapper">
                <div className="board-header">
                    <h1>{board.title}</h1>
                </div>
                <div className="board-overflow">
                    {renderBoardWithDnd()}
                </div>
            </div>;
    } else if (isLoading) {
        content = <div style={{textAlign:"center", marginTop:"250px"}}>
            <Spin size="large" />
        </div>;
    } else {
        content = <Empty />;
    }
    return content;
};

export default Board;
