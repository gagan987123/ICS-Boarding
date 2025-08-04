import React from 'react';
import { RouteObject } from 'react-router-dom';
import App from './App';

// Define our routes
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      // Add additional routes here as needed
      // For example:
      // { path: '/about', element: <AboutPage /> },
    ]
  },
];

export default routes;
