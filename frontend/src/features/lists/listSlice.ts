import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { Card, List, addCard, getList } from '../../api/openkbApi';
import { addListFailed } from './listsSlice';

interface ListDetailsState {
    listsById: Record<number, List>;
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
      getListStart(state) {
        state.isLoading = true;
        state.error = null;
      },
      getListSuccess(state, action: PayloadAction<List>) {
        state.isLoading = false;
        state.error = null;
        state.listsById[action.payload.id] = action.payload;
      },
      getListFailed(state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.error = action.payload;
      },
      addCardStart(state) {
        state.error = null;
      },
      addCardSuccess(state, action: PayloadAction<AddCardResponse>) {
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
      addCardFailed(state, action: PayloadAction<string>) {
        state.error = action.payload;
      }
    }
});

export const {
    getListStart,
    getListSuccess,
    getListFailed,
    addCardStart,
    addCardSuccess,
    addCardFailed
} = listDetails.actions;

export default listDetails.reducer;

export const fetchList = (boardId: number, listId: number): AppThunk => async dispatch => {
    try {
        dispatch(getListStart());
        const list = await getList(boardId, listId);
        dispatch(getListSuccess(list));
    } catch (err) {
        dispatch(getListFailed(err.toString()));
    }
};

interface AddCardResponse {
    boardId: number;
    listId: number;
    card: Card;
}

export const createCard = (boardId: number, listId: number, card: Card): AppThunk => async dispatch => {
    try {
        dispatch(addCardStart());
        const newCard = await addCard(boardId, listId, card);
        dispatch(addCardSuccess({boardId, listId, card: newCard}));
    } catch (err) {
        dispatch(addListFailed(err));
    }
};
