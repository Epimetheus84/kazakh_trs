import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// костыль https://flutterq.com/solved-uncaught-referenceerror-process-is-not-defined/
// eslint-disable-next-line no-unused-vars
const { ENV1 } = process.env;
// eslint-disable-next-line no-unused-vars
const { ENV2 } = process.env;

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);


render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
