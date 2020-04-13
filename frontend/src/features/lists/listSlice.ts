import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'App/store';
import { Card, List, addCard, getList, getCards, updateCardIndexInTheSameList, updateCardIndexAndChangeList } from 'Api/openkbApi';
import { addListFailed } from './listsSlice';
import { reorder } from './reorder';

interface ListDetailsState {
    listsById: Record<string, List>;
    isLoading: boolean;
    error: string | null;
}

const initialState: ListDetailsState = {
    listsById: {},
    isLoading: false,
    error: null
}

const listDetails = createSlice({
    name: 'listDetails',
    initialState,
    reducers: {
      getListStart(state): void {
        state.isLoading = true;
        state.error = null;
      },
      getListSuccess(state, action: PayloadAction<List>): void {
        state.isLoading = false;
        state.error = null;
        state.listsById[action.payload.id] = action.payload;
      },
      getListFailed(state, action: PayloadAction<string>): void {
        state.isLoading = false;
        state.error = action.payload;
      },
      addCardStart(state): void {
        state.error = null;
      },
      addCardSuccess(state, action: PayloadAction<AddCardResponse>): void {
        state.error = null;
        const list = state.listsById[action.payload.listId];
        if (list && list.cards) {
            const cards = list.cards.slice();
            cards.push(action.payload.card);
            list.cards = cards;
        } else if (list && !list.cards) {
            list.cards = [action.payload.card];
        }
      },
      addCardFailed(state, action: PayloadAction<string>): void {
        state.error = action.payload;
      },
      updateCardOrderSuccess(state, action: PayloadAction<MoveCardResponse>): void {
        state.isLoading = false;
        state.error = null;
        const list = state.listsById[action.payload.listId];
        if (list) {
          const cards = (list.cards??[]).slice();
          list.cards = reorder(cards, action.payload.startIndex, action.payload.endIndex);
          state.listsById[action.payload.listId] = list;
        }
      },
      swapCardSuccess(state, action: PayloadAction<SwapCardResponse>): void {
        state.isLoading = false;
        state.error = null;
        const sourceList = state.listsById[action.payload.sourceListId];
        if (sourceList) {
          const cards = (sourceList.cards??[]).slice();
          const [moved] = cards.splice(action.payload.startIndex, 1);
          sourceList.cards = cards;
          state.listsById[action.payload.sourceListId] = sourceList;

          const destList = state.listsById[action.payload.destinationListId];
          if (destList) {
            const destCards = (destList.cards??[]).slice();
            destCards.splice(action.payload.endIndex, 0, moved);
            destList.cards = destCards;
            state.listsById[action.payload.destinationListId] = destList;
          }
        }
      },
      editCardSuccess(state, action: PayloadAction<Card>): void {
        if (action.payload.parentList) {
          const list = state.listsById[action.payload.parentList];
          const cards = (list.cards??[]).slice();
          const index = cards.findIndex(c => c.id === action.payload.id);
          if (index !== -1) {
            const cardToUpdate = cards[index];
            cards[index] = Object.assign(cardToUpdate, {title: action.payload.title, description: action.payload.description});
            list.cards = cards;
            state.listsById[action.payload.parentList] = list;
          }
        }
      }
    }
});

export const {
    getListStart,
    getListSuccess,
    getListFailed,
    addCardStart,
    addCardSuccess,
    addCardFailed,
    updateCardOrderSuccess,
    swapCardSuccess,
    editCardSuccess
} = listDetails.actions;

export default listDetails.reducer;

export const fetchList = (boardId: string, listId: string): AppThunk => async (dispatch): Promise<void> => {
    try {
        dispatch(getListStart());
        const list = await getList(boardId, listId);
        list.cards = await getCards(boardId, listId);
        dispatch(getListSuccess(list));
    } catch (err) {
        dispatch(getListFailed(err.toString()));
    }
};

interface AddCardResponse {
  boardId: string;
  listId: string;
  card: Card;
}

export const createCard = (boardId: string, listId: string, card: Card): AppThunk => async (dispatch): Promise<void> => {
    try {
        dispatch(addCardStart());
        const newCard = await addCard(listId, card);
        dispatch(addCardSuccess({boardId, listId, card: newCard}));
    } catch (err) {
        dispatch(addListFailed(err));
    }
};

interface MoveCardResponse {
  listId: string;
  startIndex: number;
  endIndex: number;
}

export const updateCardOrder = (boardId: string, listId: string, cardId: string, startIndex: number, endIndex: number): AppThunk => async (dispatch): Promise<void> => {
  try {
    dispatch(updateCardOrderSuccess({listId, startIndex, endIndex}));
    // update backend asynchronously
    updateCardIndexInTheSameList(boardId, listId, cardId, startIndex, endIndex);
  } catch (err) {
    // TODO handle error.
    console.log(err);
  }
};

interface SwapCardResponse {
  sourceListId: string;
  destinationListId: string;
  startIndex: number;
  endIndex: number;
}

export const moveCard = (boardId: string, sourceListId: string, destinationListId: string, cardId: string, startIndex: number, endIndex: number): AppThunk => async (dispatch): Promise<void> => {
  try {
    dispatch(swapCardSuccess({sourceListId, destinationListId, startIndex, endIndex}));
    // update backend asynchronously
    updateCardIndexAndChangeList(boardId, sourceListId, destinationListId, cardId, startIndex, endIndex);
  } catch (err) {
    console.log(err);
    // TODO handle error.
  }
};
