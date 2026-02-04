import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";


import DefaultLayout from "./layout/DefaultLayout"


import Home from "./pages/Home"
import Products from "./pages/Products.jsx"
import Wishlist from './pages/Wishlist.jsx';


import DetailProduct from './components/DetailProduct.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          <Route path="/product/:slug" element={<DetailProduct />} />


          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;