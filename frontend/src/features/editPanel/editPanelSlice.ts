import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { Card, editCard } from '../../api/openkbApi';
import { Content } from './content';
import { editCardSuccess } from '../lists/listSlice';

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

export const editCardTitle = (card: Card, title: string) : AppThunk => async dispatch => {
    const newCard = Object.assign({}, card, {title:title});
    await(editCard(newCard));
    // TODO : add wait panel
    // TODO : update card state when finalize to trigger a redraw
    newCard.parentList = card.parentList;
    dispatch(editCardSuccess(newCard));
};

export const editCardDescription = (card: Card, desc: string) : AppThunk => async dispatch => {
    const newCard = Object.assign({}, card, {description:desc});
    await(editCard(newCard));
    // TODO : add wait panel
    // TODO : update card state when finalize to trigger a redraw
};