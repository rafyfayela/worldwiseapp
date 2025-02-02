import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext();

const initialState = {
  user: null,
  isAuthentificated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "Login":
      return { ...state, user: action.payload, isAuthentificated: true };
    case "Logout":
      return { ...state, user: null, isAuthentificated: false };
    default:
      throw new Error("unkown action");
  }
}

const FakeUser = {
  name: "jack",
  email: "jack@gmail.com",
  password: "jack123",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function FakeAuthProvider({ children }) {
  const [{ user, isAuthentificated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function Login(email, password) {
    if (email === FakeUser.email && password === FakeUser.password) {
      dispatch({ type: "Login", payload: FakeUser });
    }
  }

  function Logout() {
    dispatch({ type: "Logout" });
  }

  return (
    <FakeAuthContext.Provider
      value={{ user, isAuthentificated, Login, Logout }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
}

function useFakeAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw new Error("context used outside the provider");
  return context;
}

export { FakeAuthProvider, useFakeAuth };
