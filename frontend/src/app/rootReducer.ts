import {combineReducers} from "@reduxjs/toolkit";
import appDisplayReducer from '../features/appSlice';
import boardDetailsReducer from '../features/board/boardsDetailSlice';
import listsDetailsReducer from '../features/lists/listsSlice';
import listDetailsReducer from '../features/lists/listSlice';

const rootReducer = combineReducers({
    appDisplay: appDisplayReducer,
    boards: boardDetailsReducer,
    listsDetails: listsDetailsReducer,
    listDetails: listDetailsReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
