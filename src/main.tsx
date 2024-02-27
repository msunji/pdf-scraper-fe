import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import Login from './routes/login.tsx';
import Scrape from './routes/scrape.tsx';
import ErrorPage from './routes/error-page.tsx';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  }
  ,
  {
    path: "/scrape",
    element: <Scrape />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
