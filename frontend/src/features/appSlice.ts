import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardDetails, getBoards } from 'Api/openkbApi';
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
    error: null
};

const appDisplaySlice = createSlice({
    name: 'appDisplay',
    initialState,
    reducers: {
        setCurrentBoard(state, action: PayloadAction<string>): void {
            state.boardId = action.payload
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
export const fetchBoards = (): AppThunk => async (dispatch): Promise<void> => {
    try {
      const boards = await getBoards()
      dispatch(getBoardsSuccess(boards))
    } catch (err) {
      dispatch(getBoardsFailed(err.toString()))
    }
};
