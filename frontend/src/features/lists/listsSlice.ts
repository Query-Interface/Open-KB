import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { List, getLists, addList } from '../../api/openkbApi';

interface ListsDetailsState {
    lists: Array<List> | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ListsDetailsState = {
    lists: null,
    isLoading: false,
    error: null
}

const listsDetails = createSlice({
    name: 'listsDetails',
    initialState,
    reducers: {
      getListsStart(state) {
        state.isLoading = true;
        state.error = null;
      },
      getListsSuccess(state, action: PayloadAction<Array<List>>) {
        state.lists = action.payload;
        state.isLoading = false;
        state.error = null;
      },
      getListsFailed(state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.error = action.payload;
      },
      addListSuccess(state, action: PayloadAction<List>) {
        let lists = state.lists ?? [];
        lists = lists.slice();
        lists.push(action.payload);
        state.lists = lists;
      },
      addListFailed(state, action: PayloadAction<string>) {
        state.error = action.payload
      }
    }
  });

  export const {
    getListsStart,
    getListsSuccess,
    getListsFailed,
    addListFailed,
    addListSuccess
  } = listsDetails.actions;

  export default listsDetails.reducer;

  export const fetchLists = (boardId: number): AppThunk => async dispatch => {
    try {
      dispatch(getListsStart());
      const lists = await getLists(boardId);
      dispatch(getListsSuccess(lists));
    } catch (err) {
      dispatch(getListsFailed(err.toString()));
    }
  };

  export const createList = (boardId: number, list: List): AppThunk => async dispatch => {
    try {
      const newList = await addList(boardId, list);
      dispatch(addListSuccess(newList));
    } catch (err) {
      dispatch(addListFailed(err.toString()));
    }
  };
