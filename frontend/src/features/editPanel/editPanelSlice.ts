import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { Card } from '../../api/openkbApi';
import { Content } from './content';

interface EditPanelState {
    editPanelCollapsed: boolean;
    selectedCard: Card | null;
    content: Content;
}

let initialState: EditPanelState = {
    editPanelCollapsed: true,
    selectedCard: null,
    content : Content.None
};

const editPanelSlice = createSlice({
    name: 'editPanel',
    initialState,
    reducers: {
        displayEditPanel(state, action: PayloadAction<Content>) {
            state.content = action.payload;
            state.editPanelCollapsed = false;
        },
        setSelectedCard(state, action: PayloadAction<Card>) {
            state.selectedCard = action.payload;
        },
        toggleEditPanel(state) {
            state.editPanelCollapsed = !state.editPanelCollapsed;
        }
    }
});

export const {
    displayEditPanel,
    setSelectedCard,
    toggleEditPanel
} = editPanelSlice.actions;

export default editPanelSlice.reducer;

export const displayEditCardPanel = (card: Card) : AppThunk => async dispatch => {
    dispatch(setSelectedCard(card));
    dispatch(displayEditPanel(Content.EditCard));
};
