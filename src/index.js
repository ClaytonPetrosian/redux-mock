import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,applyMiddleWare } from './redux-mock'
import thunk from './redux-thunk-mock'
import { counter } from './index.redux'
import  Provider  from './react-redux-mock';
import App from './App'

const store = createStore(counter,applyMiddleWare(thunk))
ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'))
