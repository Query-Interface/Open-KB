import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Icon } from 'antd';
import { Card } from './Card';
import { List as ModelList, Card as ModelCard } from '../../api/openkbApi';
import { fetchList, createCard } from './listSlice';

interface ListProps {
    boardId: number;
    listId: number;
}

export const List = ({boardId, listId} : ListProps) => {

    const dispatch = useDispatch();
    const list = useSelector((state: RootState) => state.listDetails.listsById[listId]);

    useEffect(() => {
        if (!list) {
            dispatch(fetchList(boardId, listId));
        }

    }, [boardId, listId, dispatch]);

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
        const newCard = {id: -1, title: "my card"};
        dispatch(createCard(boardId, listId, newCard));
    }

    let content = <div className="list-column" key={listId} ></div>;
    if (list) {
        content = <div className="list-column" key={listId} >
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
    }
    return content;
};
export default List;
