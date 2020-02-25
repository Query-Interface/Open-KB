export interface BoardDetails {
    id: number;
    title: string;
    description?: string;
    lists?: Array<List>;
}

export interface List {
    id: number;
    title: string;
    //index: number;
    cards?: Array<Card>;
}

export interface Card {
    id: number;
    title: string;
    description?: string;
}

const boards = [
    {id: 1, title: "Kanban", "icon": "project",
        lists:
        [{id:1, title:"Open", cards:[{id:1, title:"Finalize cards"},{id:2, title:"Add events for button"}]},
        {id:2, title:"In Process", cards:[{id:3, title:"Cards rendering"}]},
        {id:3, title:"Blocked", cards:[]},
        {id:4, title:"Closed", cards:[{id:4, title:"List rendering"},{id:5, title:"Basic Board layout"}]}]
    },
    {id: 2, title: "Backlog Items", "icon": "project", lists:[]},
    {id: 3, title: "Todos", "icon": "book", lists:[]}
];

function getDataFromApi<T> (url: string, defaultValue: T) : Promise<T> {
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

export async function getBoards() : Promise<Array<BoardDetails>> {
    const url = 'http://localhost:8080/api/boards';
    const data = await getDataFromApi<Array<BoardDetails>>(url, boards);
    return data;
}

export async function getBoard(id: number) : Promise<BoardDetails> {
    const board = getSampleBoard(id);
    return await getDataFromApi<BoardDetails>(`http://localhost:8080/api/boards/${id}`, board);
}

export async function addBoard(board: BoardDetails) : Promise<BoardDetails> {
    // TODO: implement API call
    let newBoard = {
        id: Math.round(Math.random())*100 + 5,
        title: board.title,
        description: board.description
    }
    return Promise.resolve(newBoard);
}

export async function getLists(boardId: number) : Promise<Array<List>> {
    const board = getSampleBoard(boardId);
    const lists = board.lists ?? [];
    return await getDataFromApi<Array<List>>(`http://localhost:8080/api/boards/${boardId}/lists`, lists);
}

export async function getList(boardId: number, listId: number) : Promise<List> {
    let list = getSampleList(boardId, listId);
    if (!list) {
        list = {id : listId, title : "not found list", cards: []};
    }

    return await getDataFromApi<List>(`http://localhost:8080/api/boards/${boardId}/lists/${listId}`, list);
}

export async function getCards(boardId:number, listId:number): Promise<Array<Card>> {
    return await getDataFromApi<Array<Card>>(`http://localhost:8080/api/boards/${boardId}/lists/${listId}/cards`, []);
}

export async function addList(boardId: number, list: List) : Promise<List> {
    // TODO: implement API call
    let newList = {
        id: Math.round(Math.random())*100 + 5,
        title: list.title
    };
    return Promise.resolve(newList);
}

export async function addCard(boardId: number, listId: number, card: Card) : Promise<Card> {
    // TODO: implement API call
    let newCard = {
        id: Math.round(Math.random())*100 + 5,
        title: card.title,
        description: card.description
    };
    return Promise.resolve(newCard);
}

export async function updateListIndex(boardId: number, listId: number, startIndex: number, endIndex: number) : Promise<any> {
    const url = `http://localhost:8080/api/boards/${boardId}/lists/swapper`;
    const action = {
        list: listId,
        from: startIndex,
        to: endIndex
    };
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
    });
}

export async function updateCardIndexInTheSameList(boardId: number, listId: number, cardId: number, startIndex: number, endIndex: number) : Promise<Response> {
    const url = `http://localhost:8080/api/boards/${boardId}/cards/swapper`;
    const action = {
        fromList: listId,
        toList: listId,
        card: cardId,
        from: startIndex,
        to: endIndex
    };
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
    });
}

export async function updateCardIndexAndChangeList(boardId: number, sourceListId: number, destinationListId: number, cardId: number, startIndex: number, endIndex: number) : Promise<Response> {
    const url = `http://localhost:8080/api/boards/${boardId}/cards/swapper`;
    const action = {
        fromList: sourceListId,
        toList: destinationListId,
        card: cardId,
        from: startIndex,
        to: endIndex
    };
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
    });
}

/*************** SAMPLE Handling **************************/
function getSampleBoard(boardId: number) : BoardDetails {
    const board = boards.filter(function (item) {
        return item.id === boardId;
    });
    return board[0];
}
function getSampleList(boardId: number, listId: number) : List {
    const board = getSampleBoard(boardId);
    const lists:Array<List> = board.lists ?? [];
    const listsFiltered = lists.filter(function (item) {
        return item.id === listId;
    });
    return listsFiltered[0];
}
