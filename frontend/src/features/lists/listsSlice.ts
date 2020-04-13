import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'App/store';
import { List, getLists, addList, updateListIndex } from 'Api/openkbApi';
import { reorder } from './reorder';

interface ListsDetailsState {
  listsById: Record<string, Array<List>>;
  isLoading: boolean;
  error: string | null;
}

interface GetListsResponse {
  boardId: string;
  lists: Array<List>;
}
interface AddListsResponse {
  boardId: string;
  list: List;
}

const initialState: ListsDetailsState = {
    listsById: {},
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
    getListsSuccess(state, action: PayloadAction<GetListsResponse>): void {
      state.listsById[action.payload.boardId] = action.payload.lists;
      state.isLoading = false;
      state.error = null;
    },
    getListsFailed(state, action: PayloadAction<string>): void {
      state.isLoading = false;
      state.error = action.payload;
    },
    addListSuccess(state, action: PayloadAction<AddListsResponse>): void {
      let lists = state.listsById[action.payload.boardId] ?? [];
      lists = lists.slice();
      lists.push(action.payload.list);
      state.listsById[action.payload.boardId] = lists;
    },
    addListFailed(state, action: PayloadAction<string>): void {
      state.error = action.payload
    },
    updateListOrderSuccess(state, action: PayloadAction<GetListsResponse>): void {
      state.listsById[action.payload.boardId] = action.payload.lists;
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
    dispatch(getListsSuccess({boardId, lists}));
  } catch (err) {
    dispatch(getListsFailed(err.toString()));
  }
};

export const createList = (boardId: string, list: List): AppThunk => async (dispatch): Promise<void> => {
  try {
    const newList = await addList(boardId, list);
    dispatch(addListSuccess({boardId, list: newList}));
  } catch (err) {
    dispatch(addListFailed(err.toString()));
  }
};

export const updateListOrder = (boardId: string, lists: Array<List>, startIndex: number, endIndex: number): AppThunk => async (dispatch): Promise<void> => {
  try {
      const movedList = lists[startIndex];
      const reordered = reorder(lists, startIndex, endIndex);
      dispatch(updateListOrderSuccess({boardId, lists: reordered}));
      // update backend asynchronously
      updateListIndex(boardId, movedList.id, startIndex, endIndex);

  } catch (err) {
      //dispatch(addListFailed(err));
  }
};
