import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'App/store';
import { BoardDetails, Card, editCard, List } from 'Api/openkbApi';
import { Content } from './content';
import { editCardSuccess } from 'Features/lists/listSlice';

interface EditPanelState {
    editPanelCollapsed: boolean;
    selectedCard: Card | null;
    selectedBoard: BoardDetails | null;
    selectedList: List | null;
    content: Content;
}

const initialState: EditPanelState = {
    editPanelCollapsed: true,
    selectedCard: null,
    selectedBoard: null,
    selectedList: null,
    content : Content.None
};

const editPanelSlice = createSlice({
    name: 'editPanel',
    initialState,
    reducers: {
        displayEditPanel(state, action: PayloadAction<Content>): void {
            state.content = action.payload;
            state.editPanelCollapsed = false;
        },
        setSelectedCard(state, action: PayloadAction<Card>): void {
            state.selectedCard = action.payload;
        },
        setSelectedBoard(state, action: PayloadAction<BoardDetails | null>): void {
            state.selectedBoard = action.payload;
        },
        toggleEditPanel(state): void {
            state.editPanelCollapsed = !state.editPanelCollapsed;
            if (state.editPanelCollapsed) {
                state.selectedCard = null;
            }
        }
    }
});

export const {
    displayEditPanel,
    setSelectedCard,
    toggleEditPanel,
    setSelectedBoard,
} = editPanelSlice.actions;

export default editPanelSlice.reducer;

export const displayEditCardPanel = (card: Card): AppThunk => async (dispatch): Promise<void> => {
    dispatch(setSelectedCard(card));
    dispatch(displayEditPanel(Content.EditCard));
};

export const displayEditBoardPanel = (board: BoardDetails | null): AppThunk => async (dispatch): Promise<void> => {
    dispatch(setSelectedBoard(board));
    dispatch(displayEditPanel(Content.EditBoard));
};

export const editCardTitle = (card: Card, title: string): AppThunk => async (dispatch): Promise<void> => {
    const newCard = Object.assign({}, card, {title:title});
    await(editCard(newCard));
    // TODO : add wait panel
    // update card state when finalize to trigger a redraw
    dispatch(editCardSuccess(newCard));
};

export const editCardDescription = (card: Card, desc: string): AppThunk => async (dispatch): Promise<void> => {
    const newCard = Object.assign({}, card, {description:desc});
    await(editCard(newCard));
    // TODO : add wait panel
    // update card state when finalize to trigger a redraw
    dispatch(editCardSuccess(newCard));
};
