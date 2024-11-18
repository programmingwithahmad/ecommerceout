import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';


import './index.css'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import { Authprovider } from './context/auth.jsx';
import { Searchprovider } from './context/search.jsx';
import { Cartprovider } from './context/cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Searchprovider>
      <Cartprovider>
  <BrowserRouter>
  <React.StrictMode>
    <Authprovider>
    <App />
    </Authprovider>
  </React.StrictMode>
  </BrowserRouter>
  </Cartprovider>
  </Searchprovider>
)
