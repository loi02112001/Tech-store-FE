import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import App from './App.jsx'
import rootReducer from './reducers/index.js'
import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>
)
