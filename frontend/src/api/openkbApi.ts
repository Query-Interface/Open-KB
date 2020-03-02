export interface BoardDetails {
    id: number;
    title: string;
    description?: string;
    lists?: Array<List>;
}

export interface List {
    id: number;
    title: string;
    cards?: Array<Card>;
}

export interface Card {
    id: number;
    title: string;
    description?: string;
}

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
    const data = await getDataFromApi<Array<BoardDetails>>(url, []);
    return data;
}

export async function getBoard(id: number) : Promise<BoardDetails> {
    return await getDataFromApi<BoardDetails>(`http://localhost:8080/api/boards/${id}`, {id:-1, title:'not found'});
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
    return await getDataFromApi<Array<List>>(`http://localhost:8080/api/boards/${boardId}/lists`, []);
}

export async function getList(boardId: number, listId: number) : Promise<List> {
    const notFound = {id : listId, title : "not found list", cards: []};

    return await getDataFromApi<List>(`http://localhost:8080/api/boards/${boardId}/lists/${listId}`, notFound);
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
