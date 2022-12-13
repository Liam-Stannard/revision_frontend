import React, { useEffect, useState } from 'react'
import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NavigationBar from "./components/NavigationBar";
import PrivateRoutes from './util/PrivateRoutes'
import { AuthProvider } from './auth/AuthProvider';

export default function App() {
  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/"  element={<HomePage/>} exact />
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </React.Fragment>
  );

    
  }


