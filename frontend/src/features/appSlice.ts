import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addBoard, BoardDetails, getBoards } from 'Api/openkbApi';
import { AppThunk } from 'App/store';

interface CurrentDisplayState {
  sliderCollapsed: boolean;
  editPanelCollapsed: boolean;
  boards: Array<BoardDetails>;
  boardId: string | null;
  error: string | null;
}

const initialState: CurrentDisplayState = {
  sliderCollapsed: false,
  editPanelCollapsed: true,
  boardId: null,
  boards: [],
  error: null,
};

const appDisplaySlice = createSlice({
  name: 'appDisplay',
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<string>): void {
      state.boardId = action.payload;
    },
    toggleSlider(state): void {
      state.sliderCollapsed = !state.sliderCollapsed;
    },
    getBoardsSuccess(state, action: PayloadAction<Array<BoardDetails>>): void {
      state.boards = action.payload;
      //state.boardId = state.boards.length > 0 ? state.boards[0].id : '';
      state.error = null;
    },
    getBoardsFailed(state, action: PayloadAction<string>): void {
      state.error = action.payload;
      state.boards = [];
    },
    addBoardStart(state): void {
      state.error = null;
    },
    addBoardSuccess(state, action: PayloadAction<BoardDetails>): void {
      state.boards.push(action.payload);
      state.error = null;
      state.boardId = action.payload.id;
    },
    addBoardFailed(state, action: PayloadAction<string>): void {
      state.error = action.payload;
    }
  },
});

export const { setCurrentBoard, toggleSlider, getBoardsSuccess, getBoardsFailed, addBoardStart, addBoardFailed, addBoardSuccess } = appDisplaySlice.actions;

export default appDisplaySlice.reducer;

// TODO: take into account current user / user: string
export const fetchBoards = (): AppThunk => async (dispatch): Promise<void> => {
  try {
    const boards = await getBoards();
    dispatch(getBoardsSuccess(boards));
  } catch (err) {
    dispatch(getBoardsFailed(err.toString()));
  }
};

export const createBoard = (): AppThunk => async (
  dispatch,
): Promise<void> => {
  try {
    dispatch(addBoardStart());
    const board: BoardDetails = {id: '', title: 'New board'};
    const newBoard = await addBoard(board);
    dispatch(addBoardSuccess(newBoard));
  } catch (err) {
    dispatch(addBoardFailed(err));
  }
};