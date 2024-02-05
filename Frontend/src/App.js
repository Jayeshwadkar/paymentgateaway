import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";
import Papel from "./Papel";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Login from "./login";
import Cookies from 'js-cookie';
import DataTabel from "./DataTabel";
import CustomRoutes from "./route/routes";
import ProtectedRoute from "./route/ProtectedRoute";
import { useSelector } from 'react-redux';
function App() {
  
  const { isAuthenticated } = useSelector((state) => {
    return {      
      isAuthenticated: state.auth.login,
    };
  });
  useEffect(()=>{
    console.log(Cookies.get('token'))
  },[])

  const initialOptions = {
   // clientId: "AaLwrOkhJMBaWBZmXKBbIPUKWsakYQARBa8DkCmlZv4Yfwnm7KqPxBcEStjj7u5JWe_BjVBgCWOhSrbP",
     clientId: "ASSHnrZmYqBBj79WFaURlEYy1cRanpu4dI8zZUgTGqDldvNZCiaQMR8K7QWd6LDO5AclJAAcba2_Fowu",
    currency: "USD",
    intent: "capture",
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <PayPalScriptProvider options={initialOptions}>
    <Routes>
    
          <Route path="/" index element={<Papel />} />
  
          
    <Route path="/login" element={<Login/>} />
    <Route
          path="/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              
              <CustomRoutes />
            </ProtectedRoute>
          }
        />
    </Routes>
    </PayPalScriptProvider>
  </Router>
  );
}

export default App;
