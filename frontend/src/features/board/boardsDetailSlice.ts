import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { BoardDetails, getBoard } from '../../api/openkbApi';

interface BoardDetailsState {
  boardsById: Record<number, BoardDetails>;
  isLoading: boolean;
  error: string | null;
}

const initialState: BoardDetailsState = {
  boardsById: {},
  isLoading: false,
  error: null
}

const boardDetails = createSlice({
  name: 'boardDetails',
  initialState,
  reducers: {
    getBoardDetailStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getBoardDetailsSuccess(state, action: PayloadAction<BoardDetails>) {
      const {id} = action.payload;
      state.boardsById[id] = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getBoardDetailsFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getBoardDetailStart,
  getBoardDetailsSuccess,
  getBoardDetailsFailed,
} = boardDetails.actions;

export default boardDetails.reducer;

export const fetchBoardDetails = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getBoardDetailStart());
    const boardDetails = await getBoard(id);
    dispatch(getBoardDetailsSuccess(boardDetails));
  } catch (err) {
    dispatch(getBoardDetailsFailed(err.toString()));
  }
};
