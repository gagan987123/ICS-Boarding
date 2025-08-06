import React from 'react';
import { RouteObject } from 'react-router-dom';
import App from './App';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

// Define our routes
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/original',
    element: <App />,
  },
];

export default routes;
