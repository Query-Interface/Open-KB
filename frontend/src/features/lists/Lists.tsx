import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { fetchLists, createList } from './listsSlice';
import { Icon } from 'antd';
import { List } from '../../api/openkbApi';
import { List as UIList } from './List';

interface ListsProps {
    boardId: number
}

export const BoardLists = ({boardId} : ListsProps) => {
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState) => state.listsDetails.lists);

    useEffect(() => {
        if (!lists) {
            dispatch(fetchLists(boardId));
        }

    }, [boardId, dispatch]);

    const onAddList = (event: React.MouseEvent) => {
        let newList = {id:-1, title: "new list", cards: []};
        dispatch(createList(boardId, newList));
    };

    const renderList = (list: List) => {
        //let cards = list.cards? list.cards : [];
        return <UIList boardId={boardId} listId={list.id} />
    }

    let content : Array<JSX.Element> = [];
    if (lists) {
        content = lists.map(function(item) {
            return renderList(item);
        });
    }
    content.push(
        <div className="list-column">
            <div className="list-container">
                <div className="new-list add-button" onClick={e => onAddList(e)}>
                    <span><Icon type="plus" /><span> Add another list</span></span>
                </div>
            </div>
        </div>);
    return content;
};

export default BoardLists;
