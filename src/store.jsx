import { createStore, combineReducers } from "redux";
import accountReducer from "./features/account/AccountSlice";
import customerReducer from "./features/customer/CustomerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
