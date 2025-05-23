import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from './redux/actions/user.actions';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Error from './pages/Error/Error.jsx';
import './sass/_Main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function App () {
    const isConnected = useSelector((state) => state.auth.isConnected);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.body) {
                        console.log('data.body reçu du backend:', data.body); // <--- Ajoute ceci
                        dispatch(userProfile(data.body));
                    }
                });
        }
    }, [token, dispatch]);

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route 
                    path='profile' 
                    element={isConnected ? <Profile /> : <Navigate to="/login" />} 
                />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </div>
    )  
}