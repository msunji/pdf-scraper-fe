import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Scrape from './routes/scrape.tsx';
import ErrorPage from './routes/error-page.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Scrape />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
