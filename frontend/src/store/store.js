import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import userReducer from "../state/userSlice";
import workspaceReducer from "../state/workspaceSlice";
import chatReducer from "../state/chatSlice";
import socketReducer from "../state/socketSlice";
import memberReducer from "../state/memberSlice";

const rootReducer = combineReducers({
  user: userReducer,
  workspaces: workspaceReducer,
  chats: chatReducer,
  socket: socketReducer,
  members: memberReducer,
});
const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
