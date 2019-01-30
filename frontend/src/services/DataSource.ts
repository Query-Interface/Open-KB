import { BoardProps, ListProps } from "../components/Board/Board";
import { CardProps } from "antd/lib/card";

const boards = [
        {"id": 1, "title": "Kanban", "icon": "project",
            lists:
            [{id:"1", "title":"Open", cards:[{id:"1", "title":"Finalize cards"},{id:"2", "title":"Add events for button"}]},
            {id:"2", "title":"In Process", cards:[{id:"3", "title":"Cards rendering"}]},
            {id:"3", "title":"Blocked"},
            {id:"4", "title":"Closed", cards:[{id:"4", "title":"List rendering"},{id:"5", "title":"Basic Board layout"}]}]
        },
        {"id": 2, "title": "Backlog Items", "icon": "project", lists:[]},
        {"id": 3, "title": "Todos", "icon": "book", lists:[]}
    ];

export class DataSource {

    static getDataFromApi<T> (url: string, defaultValue: T) : Promise<T> {
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json() as Promise<T>;
            } else {
                // for now I always want a response
                if (console !== undefined) {
                    console.log('unable to join api'.concat(response.statusText));
                }
                return Promise.resolve(defaultValue);
            }
        }).catch( error => {
            // for now I always want a response
            console.log('unable to join api');
            return Promise.resolve(defaultValue);
        });
    }

    static getBoards() : Promise<Array<BoardProps>> {
        return this.getDataFromApi<Array<BoardProps>>('http://localhost:8080/api/boards', boards);
    }

    static getBoard(boardId: number) : Promise<BoardProps> {
        const board = boards.filter(function (item) {
            return item.id === boardId;
        });
        return this.getDataFromApi<BoardProps>(`http://localhost:8080/api/boards/${boardId}`, board[0]);
    }

    static getLists(boardId: number) : Promise<Array<ListProps>> {
        const board = boards.filter(function (item) {
            return item.id === boardId;
        });
        return this.getDataFromApi<Array<ListProps>>(`http://localhost:8080/api/boards/${boardId}/lists`, board[0].lists);
    }

    static getCards(boardId: number, listId: string) : Array<CardProps> {
        const list = this.getLists(boardId).then(lists => lists.filter(function (item) {
            return item.id === listId;
        }));
        return list[0].cards || [];
    }
};
