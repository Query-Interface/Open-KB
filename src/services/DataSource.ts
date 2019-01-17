import { BoardProps, ListProps } from "../components/Board/Board";
import { CardProps } from "antd/lib/card";

const boards = [
        {"id": 10, "title": "Kanban", "icon": "project",
            lists:
            [{id:"1", "title":"Open", cards:[{id:"1", "title":"Finalize cards"},{id:"2", "title":"Add events for button"}]},
            {id:"2", "title":"In Process", cards:[{id:"3", "title":"Cards rendering"}]},
            {id:"3", "title":"Blocked"},
            {id:"4", "title":"Closed", cards:[{id:"4", "title":"List rendering"},{id:"5", "title":"Basic Board layout"}]}]
        },
        {"id": 12, "title": "Backlog Items", "icon": "project"},
        {"id": 13, "title": "Todos", "icon": "book"}
    ];

export class DataSource {
    static getBoards() {
        return boards;
    }

    static getBoard(id: number) : BoardProps {
        const board = boards.filter(function (item) {
            return item.id === id;
        });
        return board[0];
    }

    static getLists(boardId: number) : Array<ListProps> {
        return this.getBoard(boardId).lists || [];
    }

    static getCards(boardId: number, listId: string) : Array<CardProps> {
        const list = this.getLists(boardId).filter(function (item) {
            return item.id === listId;
        });
        return list[0].cards || [];
    }
};
