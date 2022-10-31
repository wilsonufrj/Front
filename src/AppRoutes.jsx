import { BrowserRouter as Routers, Route, Routes } from "react-router-dom"
import React from 'react'

import LoginPage from "./pages/login"
import Home from "./pages/Home"

import { Provider } from 'react-redux';
import { store } from './redux/store';

const AppRoutes = () => {

  return (
    <Routers>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/home" element={ <Home />} />
        </Routes>
      </Provider>
    </Routers>
  )
}

export default AppRoutes;
