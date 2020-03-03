import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardDetails, getBoards } from '../api/openkbApi';
import { AppThunk } from '../app/store';

interface CurrentDisplayState {
    sliderCollapsed: boolean;
    editPanelCollapsed: boolean;
    boards: Array<BoardDetails>;
    boardId: number | null;
    error: string | null;
}

let initialState : CurrentDisplayState = {
    sliderCollapsed: false,
    editPanelCollapsed: true,
    boardId: null,
    boards: [],
    error: null
};

const appDisplaySlice = createSlice({
    name: 'appDisplay',
    initialState,
    reducers: {
        setCurrentBoard(state, action: PayloadAction<number>) {
            state.boardId = action.payload
        },
        toggleSlider(state) {
            state.sliderCollapsed = !state.sliderCollapsed;
        },
        getBoardsSuccess(state, action: PayloadAction<Array<BoardDetails>>) {
            state.boards = action.payload;
            state.boardId = state.boards.length > 0 ? state.boards[0].id : -1;
            state.error = null;
        },
        getBoardsFailed(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.boards = [];
        }
    }
});

export const {
    setCurrentBoard,
    toggleSlider,
    getBoardsSuccess,
    getBoardsFailed
  } = appDisplaySlice.actions;

export default appDisplaySlice.reducer;

// TODO: take into account current user / user: string
export const fetchBoards = (): AppThunk => async dispatch => {
    try {
      const boards = await getBoards()
      dispatch(getBoardsSuccess(boards))
    } catch (err) {
      dispatch(getBoardsFailed(err.toString()))
    }
};
