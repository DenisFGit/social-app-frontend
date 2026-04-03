import HomePage from './layouts/HomePage';
import LoginPage from "./layouts/LoginPage";
import RegisterPage from './layouts/RegisterPage';
import NewPost from './layouts/NewPost';
import StripePage from './layouts/StripePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

import { useAppSelector, useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { fetchCurrentUser } from './store/slices/userSlice';
import { SocketProvider } from './hooks/SocketProvider';
import { Toaster } from 'react-hot-toast';

import './App.css'

interface ProtectedRouteProps {
  isAllowed: boolean;
}

function ProtectedRoute({ isAllowed }: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {

  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => {
      return Boolean(state.user.token)
    });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser())
    }
  }, [isAuthenticated, dispatch]);



  return (
    <div className="app">

      <Router>
        <SocketProvider>
          <Toaster position="top-center" />
          <Navigation />
          <div className="container">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path='/' element={<StripePage />} />

              <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/new-post' element={<NewPost />} />
              </Route>
            </Routes>
          </div>
        </SocketProvider>
      </Router>

    </div>
  )
}

export default App
