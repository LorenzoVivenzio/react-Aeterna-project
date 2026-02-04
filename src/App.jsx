import './App.css'
import Home from "./pages/Home"
import DefaultLayout from "./layout/DefaultLayout"

import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route element={<Home />} path="/" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
