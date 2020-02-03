import {combineReducers} from "@reduxjs/toolkit";
import appDisplayReducer from '../features/appSlice';
import boardDetailsReducer from '../features/board/boardsDetailSlice';
import listsDetailsReducer from '../features/lists/listsSlice';

const rootReducer = combineReducers({
    appDisplay: appDisplayReducer,
    boards: boardDetailsReducer,
    listsDetails: listsDetailsReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
