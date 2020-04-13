import {combineReducers} from "@reduxjs/toolkit";
import appDisplayReducer from 'Features/appSlice';
import boardDetailsReducer from 'Features/board/boardsDetailSlice';
import listsDetailsReducer from 'Features/lists/listsSlice';
import listDetailsReducer from 'Features/lists/listSlice';
import editPanelReducer from 'Features/editPanel/editPanelSlice';

const rootReducer = combineReducers({
    appDisplay: appDisplayReducer,
    boards: boardDetailsReducer,
    listsDetails: listsDetailsReducer,
    listDetails: listDetailsReducer,
    editPanel: editPanelReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
