import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './Components/UserLogin';
import CommentSection from './Components/CommentSection';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserLogin />} />
                <Route path="/landing" element={<CommentSection />} />
            </Routes>
        </Router>
    );
};

export default App;
