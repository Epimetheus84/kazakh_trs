import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import App from "./components/app";
import "./style/main.scss";

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Вызовем следующий метод dispatch в цепочке мидлваров.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // Это наверняка будет `экшен`, если только
    // какой-нибудь `мидлвар` дальше в цепочке не изменит его.
    return returnValue
  }
}

const store = (
  createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger)
  )
);


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
});
