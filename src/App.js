import React from 'react'
import './css/App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom"
import NavigationBar from "./components/NavigationBar";
import PrivateRoutes from './util/PrivateRoutes'

export default function App() {
  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} exact />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </React.Fragment>
  );


}


