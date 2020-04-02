import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { List, getLists, addList, updateListIndex } from '../../api/openkbApi';
import { reorder } from './reorder';

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
    getListsStart(state): void {
      state.isLoading = true;
      state.error = null;
    },
    getListsSuccess(state, action: PayloadAction<Array<List>>): void {
      state.lists = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getListsFailed(state, action: PayloadAction<string>): void {
      state.isLoading = false;
      state.error = action.payload;
    },
    addListSuccess(state, action: PayloadAction<List>): void {
      let lists = state.lists ?? [];
      lists = lists.slice();
      lists.push(action.payload);
      state.lists = lists;
    },
    addListFailed(state, action: PayloadAction<string>): void {
      state.error = action.payload
    },
    updateListOrderSuccess(state, action: PayloadAction<Array<List>>): void {
      state.lists = action.payload;
    }
  }
});

export const {
  getListsStart,
  getListsSuccess,
  getListsFailed,
  addListFailed,
  addListSuccess,
  updateListOrderSuccess
} = listsDetails.actions;

export default listsDetails.reducer;

export const fetchLists = (boardId: string): AppThunk => async (dispatch): Promise<void> => {
  try {
    dispatch(getListsStart());
    const lists = await getLists(boardId);
    dispatch(getListsSuccess(lists));
  } catch (err) {
    dispatch(getListsFailed(err.toString()));
  }
};

export const createList = (boardId: string, list: List): AppThunk => async (dispatch): Promise<void> => {
  try {
    const newList = await addList(boardId, list);
    dispatch(addListSuccess(newList));
  } catch (err) {
    dispatch(addListFailed(err.toString()));
  }
};

export const updateListOrder = (boardId: string, lists: Array<List>, startIndex: number, endIndex: number): AppThunk => async (dispatch): Promise<void> => {
  try {
      const movedList = lists[startIndex];
      const reordered = reorder(lists, startIndex, endIndex);
      dispatch(updateListOrderSuccess(reordered));
      // update backend asynchronously
      updateListIndex(boardId, movedList.id, startIndex, endIndex);

  } catch (err) {
      //dispatch(addListFailed(err));
  }
};
