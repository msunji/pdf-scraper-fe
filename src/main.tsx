import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import Layout from './components/Layout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Login from './routes/login.tsx';
import Scrape from './routes/scrape.tsx';
import Instructions from './routes/instructions.tsx';
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
    element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/scrape',
        element: <Scrape />
      },
      {
        path: '/instructions',
        element: <Instructions />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
