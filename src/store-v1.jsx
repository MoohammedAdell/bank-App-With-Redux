import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposid":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.ammount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.ammount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};

const deposid = (ammount) => {
  return { type: "account/deposid", payload: ammount };
};

const withdraw = (ammount) => {
  return { type: "account/withdraw", payload: ammount };
};

const requestLoan = (ammount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: {
      ammount: ammount,
      purpose: purpose,
    },
  };
};

const payLoan = () => {
  return { type: "account/payLoan" };
};

store.dispatch(deposid(5000));
console.log(store.getState());

store.dispatch(withdraw(2000));
console.log(store.getState());

store.dispatch(requestLoan(4000, "buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};
const updateName = (fullName) => {
  return { type: "customer/updateName", payload: fullName };
};

store.dispatch(createCustomer("Mohamed Adel", "1200516512"));
console.log(store.getState());

store.dispatch(updateName("Mohmed mo7sen"));
console.log(store.getState());
