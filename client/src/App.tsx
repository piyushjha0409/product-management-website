import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Listing from './components/Listing';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Listing /> 
    }

  ])
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
