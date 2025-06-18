
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Routes from './component/Routes.jsx'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
