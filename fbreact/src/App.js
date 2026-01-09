import logo from './logo.svg';




import './App.css';
import Navigation from './components/navigation';
import Viewall from './components/viewall';
import Addnew from './components/addnew';
import Receipedetails from './components/receipedetails';
import Updatereceipe from './components/updatereceipe';


import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import PrivateRoute from './utils/PrivateRoute';
import Footer from './components/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
  
      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" element={<Viewall />} />
          <Route path="/addnew" element={<Addnew />} />
          <Route path="/receipedetail/:id" element={<Receipedetails />} />
          <Route path="/updatereceipe/:id" element={<Updatereceipe />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 Protected Route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>


  );
}

export default App;



