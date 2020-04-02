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
    parentList?: number;
}

const apiroot = 'http://localhost:8080';

function getDataFromApi<T> (url: string, defaultValue: T): Promise<T> {
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
    }).catch(error => {
        // for now I always want a response
        console.log('unable to join api' + error);
        return Promise.resolve(defaultValue);
    });
}

export async function getBoards(): Promise<Array<BoardDetails>> {
    const url = `${apiroot}/api/boards`;
    const data = await getDataFromApi<Array<BoardDetails>>(url, []);
    return data;
}

export async function getBoard(id: number): Promise<BoardDetails> {
    return await getDataFromApi<BoardDetails>(`${apiroot}/api/boards/${id}`, {id:-1, title:'not found'});
}

export async function addBoard(board: BoardDetails): Promise<BoardDetails> {
    const url = `${apiroot}/api/boards`;
    const newBoard = {
        id: -1,
        title: board.title,
        description: board.description
    }
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBoard)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json() as Promise<BoardDetails>;
    });
}

export async function getLists(boardId: number): Promise<Array<List>> {
    return await getDataFromApi<Array<List>>(`${apiroot}/api/boards/${boardId}/lists`, []);
}

export async function getList(boardId: number, listId: number): Promise<List> {
    const notFound = {id : listId, title : "not found list", cards: []};

    return await getDataFromApi<List>(`${apiroot}/api/lists/${listId}`, notFound);
}

export async function getCards(boardId: number, listId: number): Promise<Array<Card>> {
    return await getDataFromApi<Array<Card>>(`${apiroot}/api/lists/${listId}/cards`, []);
}

export async function addList(boardId: number, list: List): Promise<List> {
    const url = `${apiroot}/api/boards/${boardId}/lists`;
    const newList = {
        id: -1,
        title: list.title
    };
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json() as Promise<List>;
    });
}

export async function editList(list: List): Promise<List> {
    const url = `${apiroot}/api/lists/${list.id}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json() as Promise<List>;
    });
}

export async function addCard(listId: number, card: Card): Promise<Card> {
    const url = `${apiroot}/api/lists/${listId}/cards`;
    const newCard = {
        id: -1,
        title: card.title,
        description: card.description
    };
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCard)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json() as Promise<Card>;
    });
}

export async function editCard(card: Card): Promise<Card> {
    const url = `${apiroot}/api/cards/${card.id}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json() as Promise<Card>;
    });
}

export async function updateListIndex(boardId: number, listId: number, startIndex: number, endIndex: number): Promise<Response> {
    const url = `${apiroot}/api/boards/${boardId}/lists/swapper`;
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

export async function updateCardIndexInTheSameList(boardId: number, listId: number, cardId: number, startIndex: number, endIndex: number): Promise<Response> {
    const url = `${apiroot}/api/boards/${boardId}/cards/swapper`;
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

export async function updateCardIndexAndChangeList(boardId: number, sourceListId: number, destinationListId: number, cardId: number, startIndex: number, endIndex: number): Promise<Response> {
    const url = `${apiroot}/api/boards/${boardId}/cards/swapper`;
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
