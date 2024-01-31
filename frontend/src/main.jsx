import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import App from './App.jsx';
import CreateUser from './components/CreateUser.jsx';
import Update from './components/Update.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/create',
    element: <CreateUser/>
  },
  {
    path: '/update/:id',
    element: <Update/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
