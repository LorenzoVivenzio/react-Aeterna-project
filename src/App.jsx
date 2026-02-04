import './App.css'
import Home from "./pages/Home"
import DefaultLayout from "./layout/DefaultLayout"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route element={<Home />} path="/" />
            <Route element={<Product />} path="/product" />
            <Route element={<Wishlist />} path="/wishlist" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
